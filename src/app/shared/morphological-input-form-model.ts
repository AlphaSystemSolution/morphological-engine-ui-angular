import {
  ArabicLetter, RootLetters, NamedTemplate, MorphologicalInput, ConjugationConfiguration, VerbalNoun, namedTemplates
} from './model';

export class MorphologicalInputFormModel {

  private _mInput: MorphologicalInput;

  private _rootLetters: RootLetters;
  private _rootLettersText: string;
  private _template: NamedTemplate;
  private _translation: string;
  private _removePassiveLine: boolean;
  private _skipRuleProcessing: boolean;
  private _verbalNouns: VerbalNoun[];
  private _verbalNounsText: string;

  static createDefaultValue(): MorphologicalInput {
    const rootLetters: RootLetters = new RootLetters(ArabicLetter.FA, ArabicLetter.AIN, ArabicLetter.LAM, ArabicLetter.TATWEEL);
    const conjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(false, false);
    return new MorphologicalInput(rootLetters, namedTemplates[0], null, conjugationConfiguration, [], []);
  }

  constructor() {
    this.mInput = MorphologicalInputFormModel.createDefaultValue();
  }

  get mInput(): MorphologicalInput {
    return this._mInput;
  }

  set mInput(src: MorphologicalInput) {
    if (src) {
      this._mInput = src;
    } else {
      this._mInput = MorphologicalInputFormModel.createDefaultValue();
    }

    this._rootLetters = this.mInput.rootLetters;
    this._rootLettersText = this._rootLetters.label;
    this._template = this.mInput.template;
    this._translation = this.mInput.translation;
    this._verbalNouns = this.mInput.verbalNouns;
    const conjugationConfiguration: ConjugationConfiguration = this.mInput.configuration;
    this.removePassiveLine = conjugationConfiguration.removePassiveLine;
    this.skipRuleProcessing = conjugationConfiguration.skipRuleProcessing;
  }

  get rootLetters(): RootLetters {
    return this._rootLetters;
  }

  set rootLetters(value: RootLetters) {
    this._rootLetters = value;
    this.rootLettersText = this._rootLetters.label;
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

  get template(): NamedTemplate {
    return this._template;
  }

  set template(value: NamedTemplate) {
    this._template = value;
    if (this.mInput) {
      this.mInput.template = this.template;
    }
  }

  get translation(): string {
    return this._translation;
  }

  set translation(value: string) {
    this._translation = value;
    if (this.mInput) {
      this.mInput.translation = this.translation;
    }
  }

  get verbalNouns(): VerbalNoun[] {
    return this._verbalNouns;
  }

  set verbalNouns(values: VerbalNoun[]) {
    this._verbalNouns = values;
    if (this.mInput) {
      this.mInput.verbalNouns = values;
      this.verbalNounsText = this.mInput.verbalNounsText;
    }
  }

  get verbalNounsText(): string {
    return this._verbalNounsText;
  }

  set verbalNounsText(value: string) {
    this._verbalNounsText = value;
  }

  get removePassiveLine(): boolean {
    return this._removePassiveLine;
  }

  set removePassiveLine(value: boolean) {
    this._removePassiveLine = value;
    if (this.mInput) {
      this.mInput.configuration.removePassiveLine = this._removePassiveLine;
    }
  }

  get skipRuleProcessing(): boolean {
    return this._skipRuleProcessing;
  }

  set skipRuleProcessing(value: boolean) {
    this._skipRuleProcessing = value;
    if (this.mInput) {
      this.mInput.configuration.skipRuleProcessing = this._skipRuleProcessing;
    }
  }
}
