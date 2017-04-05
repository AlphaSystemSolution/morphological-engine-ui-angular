import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MorphologicalInputFormModel } from '../../shared/morphological-input-form-model';
import { ArabicKeyboardComponent } from '../../shared/arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from '../../shared/arabic-dropdown/arabic-dropdown.component';
import { VerbalNounPickerComponent } from '../../shared/verbal-noun-picker/verbal-noun-picker.component';
import { NamedTemplate, MorphologicalInput } from '../../shared/model';

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

  constructor() {
    this._model = new MorphologicalInputFormModel();
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
    return NamedTemplate.namedTemplates;
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
