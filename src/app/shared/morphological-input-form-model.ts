import {
  RootLetters, NamedTemplate, MorphologicalInput, ConjugationConfiguration, VerbalNoun, namedTemplates,
  arabicLetters
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
    const rootLetters: RootLetters = new RootLetters(arabicLetters[19], arabicLetters[17], arabicLetters[22], arabicLetters[28]);
    const conjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(false, false);
    return new MorphologicalInput(rootLetters, namedTemplates[0], null, conjugationConfiguration, [], []);
  }

  static cloneMorphologicalInput(src: MorphologicalInput): MorphologicalInput {
    let result: MorphologicalInput = null;
    if (src) {
      const srcRootLetters = src.rootLetters;
      const rootLetters: RootLetters = new RootLetters(srcRootLetters.firstRadical, srcRootLetters.secondRadical,
        srcRootLetters.thirdRadical, srcRootLetters.fourthRadical);
      const srcConjugationConfiguration = src.conjugationConfiguration;
      const conjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(srcConjugationConfiguration.removePassiveLine,
        srcConjugationConfiguration.skipRuleProcessing);
      result = new MorphologicalInput(rootLetters, src.template, src.translation, conjugationConfiguration, src.verbalNouns, null);
      result.id = src.id;
    }
    return result;
  }

  private static toRootLettersString(rootLetters: RootLetters): string {
    return rootLetters.firstRadical.label + rootLetters.secondRadical.label + rootLetters.thirdRadical.label;
  }

  private static toVerbalNounsString(verbalNouns: VerbalNoun[]): string {
    let result = '';
    if (verbalNouns && verbalNouns.length > 0) {
      let verbalNoun = verbalNouns[0];
      result += verbalNoun.label;
      for (let i = 1; i < verbalNouns.length; i++) {
        verbalNoun = verbalNouns[i];
        result += ' و ' + verbalNoun.label;
      }
    }
    return result;
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
    this._rootLettersText = MorphologicalInputFormModel.toRootLettersString(this._rootLetters);
    this._template = this.mInput.template;
    this._translation = this.mInput.translation;
    this._verbalNouns = this.mInput.verbalNouns;
    const conjugationConfiguration: ConjugationConfiguration = this.mInput.conjugationConfiguration;
    this.removePassiveLine = conjugationConfiguration.removePassiveLine;
    this.skipRuleProcessing = conjugationConfiguration.skipRuleProcessing;
  }

  get rootLetters(): RootLetters {
    return this._rootLetters;
  }

  set rootLetters(value: RootLetters) {
    this._rootLetters = value;
    this.rootLettersText = MorphologicalInputFormModel.toRootLettersString(this._rootLetters);
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
    this.verbalNounsText = MorphologicalInputFormModel.toVerbalNounsString(this.verbalNouns);
    if (this.mInput) {
      this.mInput.verbalNouns = values;
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
}
