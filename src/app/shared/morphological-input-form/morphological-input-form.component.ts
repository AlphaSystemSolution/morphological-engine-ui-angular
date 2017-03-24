import { Component, OnInit, Input, ViewChild } from '@angular/core';
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

  @ViewChild('picker') picker: ArabicKeyboardComponent;

  private _mInput: MorphologicalInput;

  // form fields, these fields will be populated via "set mInput",
  // any updated on these fields will be populated bact to "mInput"
  private _rootLetters: RootLetters;
  private _rootLettersText: string;
  private _removePassiveLine: boolean;
  private _skipRuleProcessing: boolean;

  // morphological Input Selection (MIS) form
  misForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.misForm = fb.group({
      'rootLettersText': new FormControl(),
      'removePassiveLine': new FormControl(),
      'skipRuleProcessing': new FormControl()
    });
  }

  ngOnInit() {
  }

  @Input() get mInput(): MorphologicalInput {
    if (this._mInput === null) {
      this._mInput = defaultMorphologicalInput;
    }
    return this._mInput;
  }

  set mInput(src: MorphologicalInput) {
    if (!src) {
      src = defaultMorphologicalInput;
    }
    this._mInput = src;
    this._rootLetters = this.mInput.rootLetters;
    this._rootLettersText = this.toRootLettersString();
    const conjugationConfiguration: ConjugationConfiguration = this.mInput.conjugationConfiguration;
    this.removePassiveLine = conjugationConfiguration.removePassiveLine;
    this.skipRuleProcessing = conjugationConfiguration.skipRuleProcessing;
  }

  get rootLetters(): RootLetters {
    return this._rootLetters;
  }

  set rootLetters(value: RootLetters) {
    this._rootLetters = value;
    this.rootLettersText = this.toRootLettersString();
    if (this.mInput) {
      this.mInput.rootLetters = this._rootLetters;
    }
  }

  get rootLettersText(): string {
    return this._rootLettersText;
  }

  set rootLettersText(value: string) {
    this._rootLettersText = value;
  }

  get removePassiveLine(): boolean {
    return this._removePassiveLine;
  }

  set removePassiveLine(value: boolean) {
    this._removePassiveLine = value;
    if (this.mInput) {
      this.mInput.conjugationConfiguration.removePassiveLine = this._removePassiveLine;
    }
  }

  get skipRuleProcessing(): boolean {
    return this._skipRuleProcessing;
  }

  set skipRuleProcessing(value: boolean) {
    this._skipRuleProcessing = value;
    if (this.mInput) {
      this.mInput.conjugationConfiguration.skipRuleProcessing = this._skipRuleProcessing;
    }
  }

  onSubmit(event) {
    console.log('Form submitted with values: ' + JSON.stringify(event));
  }

  handleClose(event) {
    this.rootLetters = event.rootLetters;
  }

  private toRootLettersString(): string {
    const _rl = this.rootLetters;
    return _rl.firstRadical.label + _rl.secondRadical.label + _rl.thirdRadical.label;
  }

}
