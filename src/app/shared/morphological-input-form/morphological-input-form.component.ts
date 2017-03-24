import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ArabicKeyboardComponent } from '../arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from '../arabic-dropdown/arabic-dropdown.component';
import {
  ArabicLetter, RootLetters, DisplayType, NamedTemplate, MorphologicalInput, ConjugationConfiguration, arabicLetters,
  namedTemplates, defaultMorphologicalInput
} from '../model';

@Component({
  selector: 'app-morphological-input-form',
  templateUrl: './morphological-input-form.component.html',
  styleUrls: ['./morphological-input-form.component.css']
})
export class MorphologicalInputFormComponent implements OnInit {

  private _mInput: MorphologicalInput;

  private _removePassiveLine: boolean;
  private _skipRuleProcessing: boolean;

  // morphological Input Selection (MIS) form
  misForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.misForm = fb.group({
      'removePassiveLine': new FormControl(),
      'skipRuleProcessing': new FormControl()
    });
  }

  ngOnInit() {
  }

  @Input() get mInput(): MorphologicalInput {
    if (this._mInput === null) {
      this.mInput = null;
    }
    return this._mInput;
  }

  set mInput(src: MorphologicalInput) {
    if (!src) {
      src = defaultMorphologicalInput;
    }
    this._mInput = src;
    const conjugationConfiguration: ConjugationConfiguration = this.mInput.conjugationConfiguration;
    this.removePassiveLine = conjugationConfiguration.removePassiveLine;
    this.skipRuleProcessing = conjugationConfiguration.skipRuleProcessing;
  }

  get removePassiveLine(): boolean {
    return this._removePassiveLine;
  }

  set removePassiveLine(value: boolean) {
    this._removePassiveLine = value;
    this._mInput.conjugationConfiguration.removePassiveLine = this._removePassiveLine;
  }

  get skipRuleProcessing(): boolean {
    return this._skipRuleProcessing;
  }

  set skipRuleProcessing(value: boolean) {
    this._skipRuleProcessing = value;
    this._mInput.conjugationConfiguration.skipRuleProcessing = this._skipRuleProcessing;
  }

}
