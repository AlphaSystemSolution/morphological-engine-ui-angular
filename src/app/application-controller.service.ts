import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MorphologicalInputFormModel } from './shared/morphological-input-form-model';
import { ConjugationData, RootLetters, MorphologicalInput } from './shared/model';
import { MorphologicalChart } from './components/model';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationControllerService {

  private _morphologicalChartSubject: BehaviorSubject<MorphologicalChart[]>;
  public morphologicalCharts: Observable<MorphologicalChart[]>;

  constructor(private http: Http) {
  }

  getMorphologicalChart(inputs: MorphologicalInput[], format: string = 'UNICODE'): void {
    this._morphologicalChartSubject = new BehaviorSubject<MorphologicalChart[]>([]);
    this.morphologicalCharts = this._morphologicalChartSubject.asObservable();

    const path = 'morphologicalChart';
    const url = environment.morphologicalEngineBaseUrl + path;
    console.log(url);
    const headers = new Headers();
    let contentType = 'application/json;charset=UTF-8';
    const formatStream = 'STREAM' === format;
    if (formatStream) {
      contentType = 'application/x-www-form-urlencoded';
      headers.set('responseType', 'Blob');
    }
    headers.set('Content-Type', contentType);
    headers.set('format', format);

    const options = new RequestOptions({ headers: headers });
    const data = [];
    inputs.forEach(input => data.push(new ConjugationData(input)));
    const body: any = { chartConfiguration: {}, data: data };
    console.log(JSON.stringify(body));
    const response = this.http.post(url, body, options);
    if (formatStream) {
      response.subscribe(resp => {
        const blob = new Blob([resp.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url2 = window.URL.createObjectURL(blob);
        console.log('>>>>>>>>>>>>> ' + JSON.stringify(url2));
        window.open(url2, 'export');
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

}
