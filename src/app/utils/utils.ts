import { AbbreviatedConjugation } from '../model/abbreviated-conjugation';
import { RootLetters } from '../model/root-letters';
import { NamedTemplate } from '../model/named-template';
import { ArabicLetter } from '../model/arabic-letter';

export class ComparisonUtil {

  static compareAbbreviatedConjugatios(a1: AbbreviatedConjugation, a2: AbbreviatedConjugation): number {
    const t1: NamedTemplate = ComparisonUtil.getNamedTemplate(a1);
    const t2: NamedTemplate = ComparisonUtil.getNamedTemplate(a2);

    let result = t1.compareTo(t2);
    if (result === 0) {
      const rl1: RootLetters = ComparisonUtil.getRootLetters(a1);
      const rl2: RootLetters = ComparisonUtil.getRootLetters(a2);
      result = rl1.compareTo(rl2);
    }

    return result;
  }

  private static getRootLetters(abbreviatedConjugation: AbbreviatedConjugation): RootLetters {
    const rl = abbreviatedConjugation.conjugationHeader.rootLetters;
    return new RootLetters(ArabicLetter.getByName(rl.firstRadical), ArabicLetter.getByName(rl.secondRadical),
      ArabicLetter.getByName(rl.thirdRadical), ArabicLetter.getByName(rl.fourthRadical));
  }

  private static getNamedTemplate(abbreviatedConjugation: AbbreviatedConjugation): NamedTemplate {
    const template = abbreviatedConjugation.conjugationHeader.chartMode.template;
    return NamedTemplate.getByName(template);
  }
}
