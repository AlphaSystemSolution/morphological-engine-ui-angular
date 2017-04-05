import { ConjugationConfiguration, Document } from './common';
import { RootLetters } from './root-letters';
import { NamedTemplate } from './named-template';
import { VerbalNoun } from './verbal-noun';
import { NounOfPlaceAndTime } from './noun-of-place-and-time';

export class MorphologicalInput extends Document {

  private _rootLetters: RootLetters;
  private _template: NamedTemplate;
  private _translation: string;
  private _configuration: ConjugationConfiguration;
  private _verbalNouns: VerbalNoun[];
  private _nounOfPlaceAndTimes: NounOfPlaceAndTime[];

  static copy(src: MorphologicalInput, copyId: boolean): MorphologicalInput {
    if (!src) {
      return null;
    }
    const srcRootLetters = src.rootLetters;
    const rootLetters: RootLetters = new RootLetters(srcRootLetters.firstRadical, srcRootLetters.secondRadical,
      srcRootLetters.thirdRadical, srcRootLetters.fourthRadical);
    const srcConjugationConfiguration = src.configuration;
    const conjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(srcConjugationConfiguration.removePassiveLine,
      srcConjugationConfiguration.skipRuleProcessing);
    const result: MorphologicalInput = new MorphologicalInput();
    result.rootLetters = src.rootLetters;
    result.template = src.template;
    result.translation = src.translation;
    result.configuration = src.configuration;
    result.verbalNouns = src.verbalNouns;
    result.nounOfPlaceAndTimes = src.nounOfPlaceAndTimes;
    if (copyId) {
      result.id = src.id;
    }
    return result;
  }

  get rootLetters(): RootLetters {
    return this._rootLetters;
  }

  set rootLetters(value: RootLetters) {
    if (!value) {
      value = new RootLetters();
    }
    this._rootLetters = value;
  }

  get template(): NamedTemplate {
    return this._template;
  }

  set template(value: NamedTemplate) {
    if (!value) {
      value = NamedTemplate.FORM_I_CATEGORY_A_GROUP_U_TEMPLATE;
    }
    this._template = value;
  }

  get translation(): string {
    return this._translation;
  }

  set translation(value: string) {
    this._translation = value;
  }

  get configuration(): ConjugationConfiguration {
    return this._configuration;
  }

  set configuration(value: ConjugationConfiguration) {
    if (!value) {
      value = new ConjugationConfiguration();
    }
    this._configuration = value;
  }

  get verbalNouns(): VerbalNoun[] {
    return this._verbalNouns;
  }

  set verbalNouns(values: VerbalNoun[]) {
    if (!values) {
      values = [];
    }
    this._verbalNouns = values;
  }

  get nounOfPlaceAndTimes(): NounOfPlaceAndTime[] {
    return this._nounOfPlaceAndTimes;
  }

  set nounOfPlaceAndTimes(values: NounOfPlaceAndTime[]) {
    if (!values) {
      values = [];
    }
    this._nounOfPlaceAndTimes = values;
  }

  get verbalNounsText(): string {
    let result = '';
    if (this.verbalNouns && this.verbalNouns.length > 0) {
      let verbalNoun = this.verbalNouns[0];
      result += verbalNoun.label;
      for (let i = 1; i < this.verbalNouns.length; i++) {
        verbalNoun = this.verbalNouns[i];
        result += ' و ' + verbalNoun.label;
      }
    }
    return result;
  }
}
