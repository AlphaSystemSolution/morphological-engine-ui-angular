import { ConjugationHeader } from './conjugation-header';
import { ArabicLabel } from './common';
import { SarfTermType } from './sarf-term-type';
import { RootLetters } from '../model/root-letters';
import { NamedTemplate } from '../model/named-template';
import { ArabicLetter } from '../model/arabic-letter';
import { IdGenerator } from '../utils/IdGenerator';

export class ConjugationLabel extends ArabicLabel {
  public id: string;
  private _sarfTermType: SarfTermType;
  private _type: string;

  constructor(src?: any) {
    super(null, null, null);
    if (src) {
      this.id = src.id || IdGenerator.nextId();
      this.type = src.type || SarfTermType.PAST_TENSE.name;
      this.label = src.label || null;
      this.name = src.source || null;
       this.code = this.name;
    }
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
    this._sarfTermType = SarfTermType.getByName(this.type);
  }

  get sarfTermType(): SarfTermType {
    return this._sarfTermType;
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
  private _rootLetters: RootLetters;
  private _namedTemplate: NamedTemplate;

  private static getLabel(value?: any): ConjugationLabel {
    return value ? new ConjugationLabel(value) : null;
  }

  private static getLabels(values: any[]): ConjugationLabel[] {
    if (!values) {
      return null;
    }
    const labels: ConjugationLabel[] = [];
    values.forEach(value => labels.push(AbbreviatedConjugation.getLabel(value)));
    return labels;
  }

  private static getRootLetters(conjugationHeader: ConjugationHeader): RootLetters {
    if (conjugationHeader === null) {
      return null;
    }
    const rl = conjugationHeader.rootLetters;
    return new RootLetters(ArabicLetter.getByName(rl.firstRadical), ArabicLetter.getByName(rl.secondRadical),
      ArabicLetter.getByName(rl.thirdRadical), ArabicLetter.getByName(rl.fourthRadical));
  }

  private static getNamedTemplate(conjugationHeader: ConjugationHeader): NamedTemplate {
    if (conjugationHeader === null || conjugationHeader.chartMode === null) {
      return null;
    }
    const template = conjugationHeader.chartMode.template;
    return NamedTemplate.getByName(template);
  }

  constructor(src?: any) {
    if (src) {
      this.id = src.id || IdGenerator.nextId();
      this.conjugationHeader = src.conjugationHeader || null;
      this._rootLetters = AbbreviatedConjugation.getRootLetters(this.conjugationHeader);
      this._namedTemplate = AbbreviatedConjugation.getNamedTemplate(this.conjugationHeader);
      this.pastTense = AbbreviatedConjugation.getLabel(src.pastTense || null);
      this.presentTense = AbbreviatedConjugation.getLabel(src.presentTense || null);
      this.activeParticipleMasculine = AbbreviatedConjugation.getLabel(src.activeParticipleMasculine || null);
      this.activeParticipleFeminine = AbbreviatedConjugation.getLabel(src.activeParticipleFeminine || null);
      this.pastPassiveTense = AbbreviatedConjugation.getLabel(src.pastPassiveTense || null);
      this.presentPassiveTense = AbbreviatedConjugation.getLabel(src.presentPassiveTense || null);
      this.passiveParticipleMasculine = AbbreviatedConjugation.getLabel(src.passiveParticipleMasculine || null);
      this.passiveParticipleFeminine = AbbreviatedConjugation.getLabel(src.passiveParticipleFeminine || null);
      this.imperative = AbbreviatedConjugation.getLabel(src.imperative || null);
      this.forbidding = AbbreviatedConjugation.getLabel(src.forbidding || null);
      this.verbalNouns = AbbreviatedConjugation.getLabels(src.verbalNouns || null);
      this.adverbs = AbbreviatedConjugation.getLabels(src.adverbs || null);
    }
  }

  get rootLetters(): RootLetters {
    return this._rootLetters;
  }

  get namedTemplate(): NamedTemplate {
    return this._namedTemplate;
  }

  compareTo(other: AbbreviatedConjugation): number {
    let result = this.namedTemplate.compareTo(other.namedTemplate);
    if (result === 0) {
      result = this.rootLetters.compareTo(other.rootLetters);
    }
    return result;
  }
}
