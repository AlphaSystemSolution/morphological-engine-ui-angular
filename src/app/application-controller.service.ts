import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
  private _morphologicalChartSubject: BehaviorSubject<MorphologicalChart[]>;
  public morphologicalCharts: Observable<MorphologicalChart[]>;
  public abbreviatedConjugations: AbbreviatedConjugation[] = [];
  data: MorphologicalInput[] = [];

  constructor(private http: Http) { }

  doAbbreviatedConjugation(inputs: MorphologicalInput[], index: number = -1) {
    const url = environment.morphologicalEngineBaseUrl + 'AbbreviatedConjugation/format/UNICODE';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    const options = new RequestOptions({ headers: headers });

    const body: ConjugationTemplate = ConjugationTemplate.createConjugationTemplate(null, inputs);
    this.http.post(url, body, options).map(resp => resp.json())
      .subscribe(
      data => {
        if (index > -1 && data.length === 1) {
          this.abbreviatedConjugations[index] = new AbbreviatedConjugation(data[0]);
        } else {
          data.forEach(d => this.abbreviatedConjugations.push(new AbbreviatedConjugation(d)));
        }
        this.abbreviatedConjugations.sort((a1, a2) => a1.compareTo(a2));
      },
      err => {
        console.log('ERROR: ' + JSON.stringify(err));
      }
      );
  }

  doDetailedConjugation(type: SarfTermType, template: NamedTemplate, rootLetters: RootLetters, verbalNouns: string[],
    skipRuleProcessing: boolean) {
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
    const fourthRadical = rootLetters.fourthRadical;
    if (fourthRadical && ArabicLetter.TATWEEL.name !== fourthRadical.name) {
      headers.set('fourthRadical', fourthRadical.name);
    }
    const options = new RequestOptions({ headers: headers });

    const currentConjugationGroup: NounConjugationGroup | VerbConjugationGroup = null;
    const detailedConjugation = this.getDetailedConjugation(template, rootLetters);
    const conjugationGroup = detailedConjugation.getConjugation(type);
    console.log('>>>>>>>>>>>>>>>>>>>>>> ' + JSON.stringify(conjugationGroup));
    if (!conjugationGroup) {
      console.log('New');
      return this.http.get(url, options).map(resp => resp.json());
    } else {
      console.log('Existing');
      return Observable.create(observer => {
        console.log('HERE2');
        observer.next([currentConjugationGroup]);
        observer.complete();
      });
    }
  }

  getMorphologicalChart(inputs: MorphologicalInput[], format: string = 'UNICODE'): void {
    this._morphologicalChartSubject = new BehaviorSubject<MorphologicalChart[]>([]);
    this.morphologicalCharts = this._morphologicalChartSubject.asObservable();

    const path = 'morphologicalChart/format/';
    const url = environment.morphologicalEngineBaseUrl + path + format;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=UTF-8');

    const options = new RequestOptions({ headers: headers });
    const body: ConjugationTemplate = ConjugationTemplate.createConjugationTemplate(null, inputs);
    const response = this.http.post(url, body, options);
    if ('STREAM' === format) {
      // TODO: figure out how to convert response into BLOB
      response.map(resp => resp.text()).subscribe(_blob => {
        const blob = new Blob([_blob]);

        console.log('/////////////////// ' + JSON.stringify(_blob));
        console.log('>>>>>>>>>>>>>>> ' + JSON.stringify(blob));
      });
    } else {
      response.map(resp => resp.json()).subscribe(this._morphologicalChartSubject);
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
    const searcString = rootLetters.firstRadical.code + rootLetters.secondRadical.code + rootLetters.thirdRadical.code;
    const url = environment.dictionaryUrl + searcString;
    window.open(url, 'dictionary');
  }

  importFile(text: string) {
    this.data = [];
    const template: ConjugationTemplate = JSON.parse(text);
    const data = template.data;
    if (data) {
      data.forEach(d => this.data.push(MorphologicalInput.fromConjugationData(d)));
      this.data.sort((d1, d2) => d1.compareTo(d2));
      this.doAbbreviatedConjugation(this.data);
    }
  }

  exportFile(fileName: string) {
    const body: ConjugationTemplate = ConjugationTemplate.createConjugationTemplate(null, this.data);
    FileSaver.saveAs(new Blob([JSON.stringify(body)]), fileName);
  }

  addData(result: MorphologicalInput, index: number) {
    if (index > -1) {
      this.data[index] = result;
    } else {
      this.data.push(result);
    }
    this.data.sort((d1, d2) => d1.compareTo(d2));
    this.doAbbreviatedConjugation([result], index);
  }

  removeData(index: number) {
    this.data.splice(index, 1);
    this.abbreviatedConjugations.splice(index, 1);
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

  updateDetailedConjugation(type: SarfTermType, template: NamedTemplate, rootLetters: RootLetters,
    value: NounConjugationGroup | VerbConjugationGroup) {
    this.getDetailedConjugation(template, rootLetters).setConjugation(type, value);
  }

  getCurrentConfiguration(index: number): ConjugationConfiguration {
    return this.data[index].configuration;
  }

  private getDetailedConjugation(template: NamedTemplate, rootLetters): DetailedConjugation {
    let result: DetailedConjugation = new DetailedConjugation();
    result.namedTemplate = template;
    result.rootLetters = rootLetters;
    const results = this.detailedConjugations.filter(d => d.equals(result));
    if (results && results.length > 0) {
      result = results[0];
      this.detailedConjugations.push(result);
      this.detailedConjugations.sort((d1, d2) => d1.compareTo(d2));
    }
    return result;
  }

}
