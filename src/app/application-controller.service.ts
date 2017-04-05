import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MorphologicalInputFormModel } from './shared/morphological-input-form-model';
import { ConjugationTemplate } from './model/conjugation-template';
import { RootLetters } from './model/root-letters';
import { MorphologicalInput } from './model/morphological-input';
import { MorphologicalChart } from './components/model';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import * as FileSaver from 'file-saver';

@Injectable()
export class ApplicationControllerService {

  private _morphologicalChartSubject: BehaviorSubject<MorphologicalChart[]>;
  public morphologicalCharts: Observable<MorphologicalChart[]>;
  data: MorphologicalInput[] = [];

  constructor(private http: Http) {
    this.data[0] = MorphologicalInputFormModel.createDefaultValue();
  }

  getMorphologicalChart(inputs: MorphologicalInput[], format: string = 'UNICODE'): void {
    this._morphologicalChartSubject = new BehaviorSubject<MorphologicalChart[]>([]);
    this.morphologicalCharts = this._morphologicalChartSubject.asObservable();

    const path = 'morphologicalChart/format/';
    const url = environment.morphologicalEngineBaseUrl + path + format;
    console.log(url);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=UTF-8');

    const options = new RequestOptions({ headers: headers });
    const body: ConjugationTemplate = ConjugationTemplate.createConjugationTemplate(null, inputs);
    console.log(JSON.stringify(body));
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
    }
  }

  exportFile(fileName: string) {
    const body: ConjugationTemplate = ConjugationTemplate.createConjugationTemplate(null, this.data);
    FileSaver.saveAs(new Blob([JSON.stringify(body)]), fileName);
  }

}
