import { AbbreviatedConjugation } from '../model/abbreviated-conjugation';
import { DetailedConjugation } from '../model/detailed-conjugation';

export class MorphologicalChart {
  constructor(public abbreviatedConjugation: AbbreviatedConjugation, public detailedConjugation: DetailedConjugation) { }
}
