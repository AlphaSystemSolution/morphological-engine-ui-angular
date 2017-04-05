import { ConjugationConfiguration, Document } from './common';
import { MorphologicalInput } from './morphological-input';
import { RootLetters } from './root-letters';
import { ArabicLetter } from './arabic-letter';
import { VerbalNoun } from './verbal-noun';

export class ConjugationData extends Document {
  template: string;
  rootLetters: any;
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

  private static createRootLetters(src: RootLetters): any {
    const fr: ArabicLetter = src.fourthRadical;
    let fourthRadical = null;
    if (fr !== null && !ArabicLetter.TATWEEL.equals(fr)) {
      fourthRadical = fr.name;
    }
    return {
      firstRadical: src.firstRadical.name, secondRadical: src.secondRadical.name, thirdRadical: src.thirdRadical.name,
      fourthRadical: fourthRadical
    };
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
