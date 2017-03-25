import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MorphologicalInputFormModel } from '../morphological-input-form-model';
import { ApplicationControllerService } from '../application-controller.service';
import { ArabicKeyboardComponent } from '../arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from '../arabic-dropdown/arabic-dropdown.component';
import { NamedTemplate, namedTemplates } from '../model';

@Component({
  selector: 'app-morphological-input-form',
  templateUrl: './morphological-input-form.component.html',
  styleUrls: ['./morphological-input-form.component.css']
})
export class MorphologicalInputFormComponent implements OnInit {

  private _model: MorphologicalInputFormModel;

  // morphological Input Selection (MIS) form
  misForm: FormGroup;

  constructor(fb: FormBuilder, private applicationController: ApplicationControllerService) {
    this._model = this.applicationController.model;
    this.misForm = fb.group({
      'rootLettersText': new FormControl(),
      'template': new FormControl(),
      'translation': new FormControl(),
      'removePassiveLine': new FormControl(),
      'skipRuleProcessing': new FormControl()
    });
  }

  ngOnInit() {
  }

  get model(): MorphologicalInputFormModel {
    return this._model;
  }

  get namedTemplates(): NamedTemplate[] {
    return namedTemplates;
  }

  onSubmit(event) {
    console.log('Form submitted with values: ' + JSON.stringify(this.model.mInput));
    this.applicationController.model = this._model;
  }

  handleClose(event) {
    this._model.rootLetters = event.rootLetters;
  }

  viewDictionary() {
    this.applicationController.openWithRootLetters(this.model.mInput.rootLetters);
  }

}
