import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApplicationControllerService } from '../../application-controller.service';
import { MorphologicalInputFormModel } from '../../shared/morphological-input-form-model';
import { ArabicKeyboardComponent } from '../../shared/arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from '../../shared/arabic-dropdown/arabic-dropdown.component';
import { VerbalNounPickerComponent } from '../../shared/verbal-noun-picker/verbal-noun-picker.component';
import { NamedTemplate } from '../../model/named-template';
import { MorphologicalInput } from '../../model/morphological-input';

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

  constructor(private applicationController: ApplicationControllerService, ) {
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

  viewDictionary(event) {
    this.applicationController.openWithRootLetters(this._model.rootLetters);
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
