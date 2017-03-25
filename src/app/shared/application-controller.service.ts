import { Injectable } from '@angular/core';
import { MorphologicalInputFormModel } from './morphological-input-form-model';
import { RootLetters } from './model';
import { environment } from '../../environments/environment';

@Injectable()
export class ApplicationControllerService {

  private _model: MorphologicalInputFormModel;
  private dictionaryWindow: any;

  constructor() {
    this._model = new MorphologicalInputFormModel();
  }

  get model(): MorphologicalInputFormModel {
    return this._model;
  }

  set model(model: MorphologicalInputFormModel) {
    if (model !== null) {
      this._model = new MorphologicalInputFormModel();
    } else {
      this._model = model;
    }
  }

  openWithRootLetters(rootLetters: RootLetters): void {
    const searcString = rootLetters.firstRadical.code + rootLetters.secondRadical.code + rootLetters.thirdRadical.code;
    const url = environment.dictionaryUrl +  searcString;
    window.open(url, 'dictionary');
  }

}
