import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MorphologicalInputFormModel } from './morphological-input-form-model';
import { RootLetters, MorphologicalInput } from './model';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationControllerService {

  private _morphologicalChartSubject: BehaviorSubject<any>;
  public morphologicalCharts: Observable<any>;
  private _model: MorphologicalInputFormModel;
  private dictionaryWindow: any;

  constructor(private http: Http) {
    this._model = new MorphologicalInputFormModel();
  }

  get model(): MorphologicalInputFormModel {
    return this._model;
  }

  set model(model: MorphologicalInputFormModel) {
    if (model) {
      this._model = model;
    } else {
      this._model = new MorphologicalInputFormModel();
    }
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
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    const options = new RequestOptions({ headers: headers });
    this.http.get(url, options).map(resp => resp.json()).subscribe(this._morphologicalChartSubject);
  }

  openWithRootLetters(rootLetters: RootLetters): void {
    const searcString = rootLetters.firstRadical.code + rootLetters.secondRadical.code + rootLetters.thirdRadical.code;
    const url = environment.dictionaryUrl + searcString;
    window.open(url, 'dictionary');
  }

}
