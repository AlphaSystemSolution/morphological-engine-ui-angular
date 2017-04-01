import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MorphologicalInputFormModel } from '../../shared/morphological-input-form-model';
import { ArabicKeyboardComponent } from '../../shared/arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from '../../shared/arabic-dropdown/arabic-dropdown.component';
import { VerbalNounPickerComponent } from '../../shared/verbal-noun-picker/verbal-noun-picker.component';
import { NamedTemplate, MorphologicalInput, namedTemplates } from '../../shared/model';

@Component({
  selector: 'app-morphological-input-form',
  templateUrl: './morphological-input-form.component.html',
  styleUrls: ['./morphological-input-form.component.css']
})
export class MorphologicalInputFormComponent implements OnInit {

  @ViewChild('verbalNounPicker') verbalNounPicker: VerbalNounPickerComponent;
  private _model: MorphologicalInputFormModel;
  @Input() visible: boolean;
  @Output() onHide: EventEmitter<any> = new EventEmitter();
  mode = 'ADD';
  // morphological Input Selection (MIS) form
  misForm: FormGroup;

  constructor(fb: FormBuilder) {
    this._model = new MorphologicalInputFormModel();
    this.misForm = fb.group({
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

  set model(value: MorphologicalInputFormModel) {
    this._model = value;
  }

  get namedTemplates(): NamedTemplate[] {
    return namedTemplates;
  }

  onSubmit(event) {
    // TODO:
  }

  hideDialog(event, status: string) {
    let _result: MorphologicalInput;
    this.visible = false;
    switch (status) {
      case 'submit':
        _result = this.model.mInput;
        break;
      case 'cancel':
        _result = null;
        break;
    }
    this._model = new MorphologicalInputFormModel();
    this.onHide.emit({ 'originalEvent': event, 'status': status, 'result': _result });
  }

  handleClose(event) {
    this.model.rootLetters = event.rootLetters;
  }

  handleSelectTemplate(event) {
    this.verbalNounPicker.form = <NamedTemplate>event.value;
  }

  updateVerbalNoun(event) {
    const verbalNouns = [];
    let index = 0;
    event.forEach(e => {
      verbalNouns[index++] = e.value;
    });
    this.model.verbalNouns = verbalNouns;
  }

}
