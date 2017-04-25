import { ConjugationHeader } from './conjugation-header';
import { ArabicLabel } from './common';
import { SarfTermType } from './sarf-term-type';
import { IdGenerator } from '../utils/IdGenerator';

export class ConjugationLabel extends ArabicLabel {
  private _type: SarfTermType;

  constructor(type: SarfTermType, label: string) {
    super(type.name, label, type.code);
    this._type = type;
  }

  get type(): SarfTermType {
    return this._type;
  }
}

export class AbbreviatedConjugation {
  public id: string;
  public conjugationHeader: ConjugationHeader;
  public pastTense: ConjugationLabel;
  public presentTense: ConjugationLabel;
  public activeParticipleMasculine: ConjugationLabel;
  public activeParticipleFeminine: ConjugationLabel;
  public pastPassiveTense: ConjugationLabel;
  public presentPassiveTense: ConjugationLabel;
  public passiveParticipleMasculine: ConjugationLabel;
  public passiveParticipleFeminine: ConjugationLabel;
  public imperative: ConjugationLabel;
  public forbidding: ConjugationLabel;
  public verbalNouns: ConjugationLabel[];
  public adverbs: ConjugationLabel[];

  private static getLabel(type: SarfTermType, value: string): ConjugationLabel {
    return value ? new ConjugationLabel(type, value) : null;
  }

  private static getLabels(type: SarfTermType, values: string[]): ConjugationLabel[] {
    if (!values) {
      return null;
    }
    const labels: ConjugationLabel[] = [];
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
