import { ConjugationConfiguration, Document } from './common';
import { ArabicLetter } from './arabic-letter';
import { RootLetters } from './root-letters';
import { NamedTemplate } from './named-template';
import { VerbalNoun } from './verbal-noun';
import { NounOfPlaceAndTime } from './noun-of-place-and-time';
import { ConjugationData } from './conjugation-data';

export class MorphologicalInput extends Document {

  private _rootLetters: RootLetters;
  private _template: NamedTemplate;
  private _translation: string;
  private _configuration: ConjugationConfiguration;
  private _verbalNouns: VerbalNoun[];
  private _nounOfPlaceAndTimes: NounOfPlaceAndTime[];
  private _templateId: string;

  static copy(src: any, copyId: boolean): MorphologicalInput {
    if (!src) {
      return null;
    }
    const srcRootLetters = src.rootLetters || new RootLetters();
    const rootLetters: RootLetters = new RootLetters(srcRootLetters.firstRadical, srcRootLetters.secondRadical,
      srcRootLetters.thirdRadical, srcRootLetters.fourthRadical);
    const srcConjugationConfiguration = src.configuration || new ConjugationConfiguration();
    const conjugationConfiguration: ConjugationConfiguration = new ConjugationConfiguration(srcConjugationConfiguration.removePassiveLine,
      srcConjugationConfiguration.skipRuleProcessing);
    const result: MorphologicalInput = new MorphologicalInput();
    result.rootLetters = rootLetters;
    result.template = src.template || NamedTemplate.FORM_I_CATEGORY_A_GROUP_U_TEMPLATE;
    result.translation = src.translation || null;
    result.configuration = srcConjugationConfiguration;
    result.verbalNouns = src.verbalNouns || [];
    result.nounOfPlaceAndTimes = src.nounOfPlaceAndTimes || [];
    if (copyId) {
      result.id = src.id;
    }
    return result;
  }

  static createDefaultMorphologicalInput(): MorphologicalInput {
    return MorphologicalInput.copy({}, false);
  }

  static fromConjugationData(src: ConjugationData): MorphologicalInput {
    const result: MorphologicalInput = new MorphologicalInput();
    result.template = NamedTemplate.getByName(src.template);
    const rl = src.rootLetters;
    if (rl) {
      const rootLetters = new RootLetters();
      rootLetters.firstRadical = ArabicLetter.getByName(rl.firstRadical);
      rootLetters.secondRadical = ArabicLetter.getByName(rl.secondRadical);
      rootLetters.thirdRadical = ArabicLetter.getByName(rl.thirdRadical);
      rootLetters.fourthRadical = ArabicLetter.getByName(rl.fourthRadical);
      result.rootLetters = rootLetters;
    }
    result.translation = src.translation;
    result.configuration = src.configuration;
    const _verbalNouns = src.verbalNouns;
    if (_verbalNouns) {
      const verbalNouns = [];
      _verbalNouns.forEach(vn => {
        const verbalNoun = VerbalNoun.getByName(vn);
        if (verbalNoun) {
          verbalNouns.push(verbalNoun);
        }
      });
      result.verbalNouns = verbalNouns;
    }

    result.nounOfPlaceAndTimes = [];
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

  get templateId(): string {
    return this.template.name + '_' + this.rootLetters.name;
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

  public compareTo(other: MorphologicalInput): number {
    let result = this.template.compareTo(other.template);
    if (result === 0) {
      result = this.rootLetters.compareTo(other.rootLetters);
    }
    return result;
  }
}
