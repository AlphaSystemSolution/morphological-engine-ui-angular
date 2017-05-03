import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MorphologicalInputFormModel } from './shared/morphological-input-form-model';
import { ConjugationConfiguration } from './model/common';
import { ConjugationTemplate } from './model/conjugation-template';
import { ArabicLetter } from './model/arabic-letter';
import { RootLetters } from './model/root-letters';
import { MorphologicalInput } from './model/morphological-input';
import { AbbreviatedConjugation } from './model/abbreviated-conjugation';
import { SarfTermType } from './model/sarf-term-type';
import { NamedTemplate } from './model/named-template';
import { DetailedConjugation, NounConjugationGroup, VerbConjugationGroup } from './model/detailed-conjugation';
import { MorphologicalChart } from './components/model';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import * as FileSaver from 'file-saver';

@Injectable()
export class ApplicationControllerService {

  private detailedConjugations: DetailedConjugation[] = [];
  private abbreviatedConjugations: AbbreviatedConjugation[] = [];
  private sortField = 'rootLetters';
  private sortOrder = 1;
  data: MorphologicalInput[] = [];

  constructor(private http: Http) {
    this.data = [
      MorphologicalInput.createDefaultMorphologicalInput()
    ];
  }

  doAbbreviatedConjugation(input: MorphologicalInput, index: number = -1): Observable<AbbreviatedConjugation[]> {
    const filteredValues = this.abbreviatedConjugations.filter((value) => value.id === input.templateId);
    if (index <= -1 && filteredValues && filteredValues.length > 0) {
      return Observable.create(observer => {
        observer.next([filteredValues[0]]);
        observer.complete();
      });
    } else {
      const url = environment.morphologicalEngineBaseUrl + 'AbbreviatedConjugation/format/UNICODE';

      const headers = new Headers();
      headers.set('Content-Type', 'application/json;charset=UTF-8');
      const options = new RequestOptions({ headers: headers });

      const body: ConjugationTemplate = ConjugationTemplate.createConjugationTemplate(null, [input]);
      return this.http.post(url, body, options)
        .map(resp => {
          return resp.json().map(item => {
            const selectedAbbreviatedConjugation = new AbbreviatedConjugation(item);
            if (index > -1) {
              this.abbreviatedConjugations[index] = selectedAbbreviatedConjugation;
            } else {
              this.abbreviatedConjugations.push(selectedAbbreviatedConjugation);
              this.abbreviatedConjugations.sort(this.getSortFunction(this.sortField, this.sortOrder));
            }
            return selectedAbbreviatedConjugation;
          });
        });
    }
  }

  doDetailedConjugation(id: string, type: SarfTermType, template: NamedTemplate, rootLetters: RootLetters, verbalNouns: string[],
    skipRuleProcessing: boolean): Observable<NounConjugationGroup[] | VerbConjugationGroup[]> {
    let currentConjugationGroup: NounConjugationGroup | VerbConjugationGroup = null;
    const detailedConjugation = this.getDetailedConjugation(template, rootLetters);
    const conjugationGroup = detailedConjugation.getConjugation(id, type);

    if (conjugationGroup) {
      if (conjugationGroup instanceof Array) {
        const array: NounConjugationGroup[] = <NounConjugationGroup[]>conjugationGroup;
        if (array.length > 0) {
          currentConjugationGroup = array[0];
        }
      } else {
        currentConjugationGroup = conjugationGroup;
      }
    }

    if (currentConjugationGroup) {
      return Observable.create(observer => {
        observer.next([currentConjugationGroup]);
        observer.complete();
      });
    } else {
      let url = environment.morphologicalEngineBaseUrl + 'DetailedConjugation/type/%TYPE%/template/%TEMPLATE%/format/UNICODE';
      const replacements = { '%TYPE%': type.name, '%TEMPLATE%': template.name };
      url = url.replace(/%\w+%/g, function (all) {
        return replacements[all] || all;
      });

      const headers = new Headers();
      headers.set('Content-Type', 'application/json;charset=UTF-8');
      headers.set('firstRadical', rootLetters.firstRadical.name);
      headers.set('secondRadical', rootLetters.secondRadical.name);
      headers.set('thirdRadical', rootLetters.thirdRadical.name);
      if (rootLetters.hasFourthRadical) {
        headers.set('fourthRadical', rootLetters.fourthRadical.name);
      }
      if (verbalNouns && verbalNouns.length > 0) {
        headers.set('verbalNouns', verbalNouns);
      }
      const options = new RequestOptions({ headers: headers });

      return this.http.get(url, options).map(resp => {
        return resp.json().map(item => {
          let group: NounConjugationGroup | VerbConjugationGroup = null;
          if (type.isVerbType) {
            group = new VerbConjugationGroup(item);
          } else {
            group = new NounConjugationGroup(item);
          }
          group.id = id;
          this.updateDetailedConjugation(type, template, rootLetters, group);
          return group;
        });
      });
    }
  }

  exportMorphologicalChart(input: MorphologicalInput) {
    const rl: RootLetters = input.rootLetters;
    const path = 'morphologicalChart2/form/' + input.template.name + '/firstRadical/' + rl.firstRadical.name +
      '/secondRadical/' + rl.secondRadical.name + '/thirdRadical/' + rl.thirdRadical.name + '/';
    const url = environment.morphologicalEngineBaseUrl + path;
    console.log(url);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('format', 'UNICODE');
    headers.set('translation', input.translation);
    const verbalNounValues: string[] = [];
    const verbalNouns = input.verbalNouns;
    let index = 0;
    verbalNouns.forEach(vn => verbalNounValues[index++] = vn.name);
    headers.set('verbalNouns', verbalNounValues);
    const conjugationConfiguration = input.configuration;
    if (conjugationConfiguration) {
      headers.set('removePassiveLine', '' + conjugationConfiguration.removePassiveLine);
      headers.set('skipRuleProcessing', '' + conjugationConfiguration.skipRuleProcessing);
    }
    const options = new RequestOptions({ headers: headers });
    this.http.get(url, options).subscribe(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url2 = window.URL.createObjectURL(blob);
      window.open(url2, 'export');
    });
  }

  openWithRootLetters(rootLetters: RootLetters): void {
    let searchString = this.getLetterCode(rootLetters.firstRadical) + this.getLetterCode(rootLetters.secondRadical);
    if (!rootLetters.secondRadical.equals(rootLetters.thirdRadical)) {
      searchString += this.getLetterCode(rootLetters.thirdRadical);
    }
    const fourthRadical = rootLetters.fourthRadical;
    if (fourthRadical && !ArabicLetter.TATWEEL.equals(fourthRadical)) {
      searchString += this.getLetterCode(fourthRadical);
    }
    const url = environment.dictionaryUrl + searchString;
    window.open(url, 'dictionary');
  }

  importFile(text: string) {
    this.data = [];
    const template: ConjugationTemplate = JSON.parse(text);
    const data = template.data;
    if (data) {
      data.forEach(d => this.data.push(MorphologicalInput.fromConjugationData(d)));
      this.data.sort(this.getSortFunction(this.sortField, this.sortOrder));
    }
  }

  exportFile(fileName: string) {
    const body: ConjugationTemplate = ConjugationTemplate.createConjugationTemplate(null, this.data);
    FileSaver.saveAs(new Blob([JSON.stringify(body)]), fileName);
  }

  addData(result: MorphologicalInput, index: number) {
    if (index > -1) {
      this.data[index] = result;
      this.removeAbbreviatedConjugation(result.templateId);
      this.removeDetailedConjugation(result.templateId);
    } else {
      this.data.push(result);
      this.data.sort(this.getSortFunction(this.sortField, this.sortOrder));
      index = this.findInputRowIndex(result);
    }
    const page = Math.floor(index / environment.numOfRows);
    const first = page * environment.numOfRows;
    return { first: first, rows: environment.numOfRows };
  }

  removeData(index: number) {
    this.data.splice(index, 1);
    this.abbreviatedConjugations.splice(index, 1);
    this.detailedConjugations.splice(index, 1);
  };

  findInputRowIndex(input: MorphologicalInput): number {
    let index = -1;
    this.data.filter((o, i) => {
      if (o.id === input.id) {
        index = i;
      }
    });
    return index;
  }

  sort(sortField: string, sortOrder: number) {
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.data.sort(this.getSortFunction(this.sortField, this.sortOrder));
  }

  private getSortFunction(sortField: string, sortOrder: number) {
    let comparator;
    if (sortField === 'rootLetters') {
      comparator = function (o1, o2): number {
        let result = (o2 && o1.rootLetters.compareTo(o2.rootLetters) * sortOrder) || 1;
        if (result === 0) {
          result = (o2 && o1.template.compareTo(o2.template)) || 1;
        }
        return result;
      };
    } else if (sortField === 'template') {
      comparator = function (o1, o2): number {
        let result = (o2 && o1.template.compareTo(o2.template) * sortOrder) || 1;
        if (result === 0) {
          result = (o2 && o1.rootLetters.compareTo(o2.rootLetters)) || 1;
        }
        return result;
      };
    }
    return comparator;
  }

  private updateDetailedConjugation(type: SarfTermType, template: NamedTemplate, rootLetters: RootLetters,
    value: NounConjugationGroup | VerbConjugationGroup) {
    this.getDetailedConjugation(template, rootLetters).setConjugation(type, value);
  }

  private getDetailedConjugation(template: NamedTemplate, rootLetters): DetailedConjugation {
    let result: DetailedConjugation = new DetailedConjugation();
    result.rootLetters = rootLetters;
    result.namedTemplate = template;
    const results = this.detailedConjugations.filter(d => d.equals(result));
    if (results && results.length > 0) {
      result = results[0];
    } else {
      this.detailedConjugations.push(result);
      this.detailedConjugations.sort(this.getSortFunction(this.sortField, this.sortOrder));
    }
    return result;
  }

  private removeAbbreviatedConjugation(id: string) {
    let index = -1;
    this.abbreviatedConjugations.filter((o, i) => {
      if (o.id === id) {
        index = i;
      }
    });
    if (index > -1) {
      this.abbreviatedConjugations.splice(index, 1);
    }
  }

  private removeDetailedConjugation(id: string) {
    let index = -1;
    this.detailedConjugations.filter((o, i) => {
      if (o.id === id) {
        index = i;
      }
    });
    if (index > -1) {
      this.detailedConjugations.splice(index, 1);
    }
  }

  private getLetterCode(letter: ArabicLetter): string {
    return ArabicLetter.HAMZA.equals(letter) ? ArabicLetter.ALIF.code : letter.code;
  }

}
