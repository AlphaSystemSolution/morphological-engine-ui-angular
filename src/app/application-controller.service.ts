import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MorphologicalInputFormModel } from './shared/morphological-input-form-model';
import { RootLetters, MorphologicalInput } from './shared/model';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationControllerService {

  private _morphologicalChartSubject: BehaviorSubject<any>;
  public morphologicalCharts: Observable<any>;
  private _model: MorphologicalInputFormModel;

  constructor(private http: Http) {
    this._model = new MorphologicalInputFormModel();
  }

  get model(): MorphologicalInputFormModel {
    return this._model;
  }

  getMorphologicalChart(): void {
    this._morphologicalChartSubject = new BehaviorSubject<any>([]);
    this.morphologicalCharts = this._morphologicalChartSubject.asObservable();

    const m: MorphologicalInput = this.model.mInput;
    const rl: RootLetters = m.rootLetters;
    const path = 'morphologicalChart/form/' + m.template.name + '/firstRadical/' + rl.firstRadical.name +
      '/secondRadical/' + rl.secondRadical.name + '/thirdRadical/' + rl.thirdRadical.name + '/';
    const url = environment.morphologicalEngineBaseUrl + path;
    console.log(url);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('format', 'UNICODE');
    headers.set('translation', m.translation);
    const options = new RequestOptions({ headers: headers });
    this.http.get(url, options).map(resp => resp.json()).subscribe(this._morphologicalChartSubject);
  }

  openWithRootLetters(rootLetters: RootLetters): void {
    const searcString = rootLetters.firstRadical.code + rootLetters.secondRadical.code + rootLetters.thirdRadical.code;
    const url = environment.dictionaryUrl + searcString;
    window.open(url, 'dictionary');
  }

}
