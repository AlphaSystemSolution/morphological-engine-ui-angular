import { ConjugationHeader } from './conjugation-header';
import { ArabicLabel } from './common';
import { SarfTermType } from './sarf-term-type';
import { IdGenerator } from '../utils/IdGenerator';

export class AbbreviatedConjugation {
  public id: string;
  public conjugationHeader: ConjugationHeader;
  public pastTense: ArabicLabel;
  public presentTense: ArabicLabel;
  public activeParticipleMasculine: ArabicLabel;
  public activeParticipleFeminine: ArabicLabel;
  public pastPassiveTense: ArabicLabel;
  public presentPassiveTense: ArabicLabel;
  public passiveParticipleMasculine: ArabicLabel;
  public passiveParticipleFeminine: ArabicLabel;
  public imperative: ArabicLabel;
  public forbidding: ArabicLabel;
  public verbalNouns: ArabicLabel[];
  public adverbs: ArabicLabel[];

  private static getLabel(type: SarfTermType, value: string): ArabicLabel {
    return value ? new ArabicLabel(type.name, value, type.name) : null;
  }

  private static getLabels(type: SarfTermType, values: string[]): ArabicLabel[] {
    if (!values) {
      return null;
    }
    const labels: ArabicLabel[] = [];
    values.forEach(value => labels.push(AbbreviatedConjugation.getLabel(type, value)));
    return labels;
  }

  constructor(src?: any) {
    this.id = src && src.id || IdGenerator.nextId();
    this.conjugationHeader = src && src.conjugationHeader || null;
    this.pastTense = AbbreviatedConjugation.getLabel(SarfTermType.PAST_TENSE, src && src.pastTense || null);
    this.presentTense = AbbreviatedConjugation.getLabel(SarfTermType.PRESENT_TENSE, src && src.presentTense || null);
    this.activeParticipleMasculine = AbbreviatedConjugation.getLabel(SarfTermType.ACTIVE_PARTICIPLE_MASCULINE,
      src && src.activeParticipleMasculine || null);
    this.activeParticipleFeminine = AbbreviatedConjugation.getLabel(SarfTermType.ACTIVE_PARTICIPLE_FEMININE,
      src && src.activeParticipleFeminine || null);
    this.pastPassiveTense = AbbreviatedConjugation.getLabel(SarfTermType.PAST_PASSIVE_TENSE, src && src.pastPassiveTense || null);
    this.presentPassiveTense = AbbreviatedConjugation.getLabel(SarfTermType.PRESENT_PASSIVE_TENSE, src && src.presentPassiveTense || null);
    this.passiveParticipleMasculine = AbbreviatedConjugation.getLabel(SarfTermType.PASSIVE_PARTICIPLE_MASCULINE,
      src && src.passiveParticipleMasculine || null);
    this.passiveParticipleFeminine = AbbreviatedConjugation.getLabel(SarfTermType.PASSIVE_PARTICIPLE_FEMININE,
      src && src.passiveParticipleFeminine || null);
    this.imperative = AbbreviatedConjugation.getLabel(SarfTermType.IMPERATIVE, src && src.imperative || null);
    this.forbidding = AbbreviatedConjugation.getLabel(SarfTermType.FORBIDDING, src && src.forbidding || null);
    this.verbalNouns = AbbreviatedConjugation.getLabels(SarfTermType.VERBAL_NOUN, src && src.verbalNouns || null);
    this.adverbs = AbbreviatedConjugation.getLabels(SarfTermType.NOUN_OF_PLACE_AND_TIME, src && src.adverbs || null);
  }
}
