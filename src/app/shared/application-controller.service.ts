import { Injectable } from '@angular/core';
import { MorphologicalInputFormModel } from './morphological-input-form-model';

@Injectable()
export class ApplicationControllerService {

  private _model: MorphologicalInputFormModel;

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

}
