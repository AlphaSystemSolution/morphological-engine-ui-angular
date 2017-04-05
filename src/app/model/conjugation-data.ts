import { ConjugationConfiguration, Document } from './common';
import { MorphologicalInput } from './morphological-input';
import { RootLetters as _RootLetters } from './root-letters';
import { ArabicLetter } from './arabic-letter';
import { VerbalNoun } from './verbal-noun';

export class RootLetters {
  firstRadical: string;
  secondRadical: string;
  thirdRadical: string;
  fourthRadical: string;
}

export class ConjugationData extends Document {
  template: string;
  rootLetters: RootLetters;
  configuration: ConjugationConfiguration;
  translation: string;
  verbalNouns: string[];

  static fromMorphologicalInput(input: MorphologicalInput): ConjugationData {
    const result = new ConjugationData();
    result.template = input.template.name;
    result.translation = input.translation;
    result.configuration = input.configuration;
    result.rootLetters = ConjugationData.createRootLetters(input.rootLetters);
    result.verbalNouns = ConjugationData.createVerbalNouns(input.verbalNouns);
    return result;
  }

  private static createRootLetters(src: _RootLetters): RootLetters {
    const fr: ArabicLetter = src.fourthRadical;
    let fourthRadical = null;
    if (fr !== null && !ArabicLetter.TATWEEL.equals(fr)) {
      fourthRadical = fr.name;
    }
    const rootLetters = new RootLetters();
    rootLetters.firstRadical = src.firstRadical.name;
    rootLetters.secondRadical = src.secondRadical.name;
    rootLetters.thirdRadical = src.thirdRadical.name;
    rootLetters.fourthRadical = fourthRadical;
    return rootLetters;
  }

  private static createVerbalNouns(verbalNouns: VerbalNoun[]): string[] {
    if (!verbalNouns && verbalNouns.length <= 0) {
      return null;
    }
    const result = [];
    verbalNouns.forEach(vn => result.push(vn.name));
    return result;
  }
}
