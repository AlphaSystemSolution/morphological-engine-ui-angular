import { IdGenerator } from '../utils/IdGenerator';
import { RootLetters } from './root-letters';
import { NamedTemplate } from './named-template';
import { SarfTermType } from './sarf-term-type';

export class ConjugationTuple {
  private _type: string;
  public singular: string;
  public dual: string;
  public plural: string;

  static getTuple(value: any): ConjugationTuple {
    return value ? new ConjugationTuple(value) : null;
  }

  constructor(src?: any) {
    if (src) {
      this.singular = src.singular || null;
      this.dual = src.dual || null;
      this.plural = src.plural || null;
    }

  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}

export interface ConjugationGroup {
  termType: string;
}

export class VerbConjugationGroup implements ConjugationGroup {
  public termType: string;
  public masculineThirdPerson: ConjugationTuple;
  public feminineThirdPerson: ConjugationTuple;
  public masculineSecondPerson: ConjugationTuple;
  public feminineSecondPerson: ConjugationTuple;
  public firstPerson: ConjugationTuple;

  constructor(src?: any) {
    if (src) {
      this.termType = src.termType || null;
      this.masculineThirdPerson = ConjugationTuple.getTuple(src.masculineThirdPerson || null);
      this.feminineThirdPerson = ConjugationTuple.getTuple(src.feminineThirdPerson || null);
      this.masculineSecondPerson = ConjugationTuple.getTuple(src.masculineSecondPerson || null);
      this.feminineSecondPerson = ConjugationTuple.getTuple(src.feminineSecondPerson || null);
      this.firstPerson = ConjugationTuple.getTuple(src.firstPerson || null);
    }
  }
}

export class NounConjugationGroup implements ConjugationGroup {
  public termType: string;
  public nominative: ConjugationTuple;
  public accusative: ConjugationTuple;
  public genitive: ConjugationTuple;

  constructor(src?: any) {
    if (src) {
      this.termType = src.termType || null;
      this.nominative = ConjugationTuple.getTuple(src.nominative || null);
      this.accusative = ConjugationTuple.getTuple(src.accusative || null);
      this.genitive = ConjugationTuple.getTuple(src.genitive || null);
    }
  }
}

export class DetailedConjugation {
  public id: string;

  // active values
  public pastTense: VerbConjugationGroup;
  public presentTense: VerbConjugationGroup;
  public activeParticipleMasculine: NounConjugationGroup;
  public activeParticipleFeminine: NounConjugationGroup;

  // passive values
  public pastPassiveTense: VerbConjugationGroup;
  public presentPassiveTense: VerbConjugationGroup;
  public passiveParticipleMasculine: NounConjugationGroup;
  public passiveParticipleFeminine: NounConjugationGroup;

  // imperative and forbidden values
  public imperative: VerbConjugationGroup;
  public forbidding: VerbConjugationGroup;

  // verbal noun values
  public verbalNouns: NounConjugationGroup[];

  // adverb values
  public adverbs: NounConjugationGroup[];

  private _rootLetters: RootLetters;
  private _namedTemplate: NamedTemplate;

  private static getVerbConjugationGroup(src: any): VerbConjugationGroup {
    return src ? new VerbConjugationGroup(src) : null;
  }

  private static getNounConjugationGroup(src: any): NounConjugationGroup {
    return src ? new NounConjugationGroup(src) : null;
  }

  constructor(src?: any) {
    if (src) {
      this.id = src.id || IdGenerator.nextId();
      this.pastTense = DetailedConjugation.getVerbConjugationGroup(src.pastTense || null);
      this.presentTense = DetailedConjugation.getVerbConjugationGroup(src.presentTense || null);
      this.activeParticipleMasculine = DetailedConjugation.getNounConjugationGroup(src.activeParticipleMasculine || null);
      this.activeParticipleFeminine = DetailedConjugation.getNounConjugationGroup(src.activeParticipleFeminine || null);

      this.pastPassiveTense = DetailedConjugation.getVerbConjugationGroup(src.pastPassiveTense || null);
      this.pastPassiveTense = DetailedConjugation.getVerbConjugationGroup(src.pastPassiveTense || null);
      this.passiveParticipleMasculine = DetailedConjugation.getNounConjugationGroup(src.passiveParticipleMasculine || null);
      this.passiveParticipleFeminine = DetailedConjugation.getNounConjugationGroup(src.passiveParticipleFeminine || null);

      this.imperative = DetailedConjugation.getVerbConjugationGroup(src.imperative || null);
      this.forbidding = DetailedConjugation.getVerbConjugationGroup(src.forbidding || null);

      if (src.verbalNouns && src.verbalNouns.length > 0) {
        this.verbalNouns = [];
        src.verbalNouns.foreach(value => this.verbalNouns.push(DetailedConjugation.getNounConjugationGroup(value)));
      }

      if (src.adverbs && src.adverbs.length > 0) {
        this.adverbs = [];
        src.adverbs.foreach(value => this.adverbs.push(DetailedConjugation.getNounConjugationGroup(value)));
      }
    }
  }

  get rootLetters(): RootLetters {
    return this._rootLetters;
  }

  set rootLetters(value: RootLetters) {
    this._rootLetters = value;
    this.updateId();
  }

  get namedTemplate(): NamedTemplate {
    return this._namedTemplate;
  }

  set namedTemplate(value: NamedTemplate) {
    this._namedTemplate = value;
    this.updateId();
  }

  getConjugation(type: SarfTermType): NounConjugationGroup | VerbConjugationGroup | NounConjugationGroup[] {
    let result = null;
    switch (type.name) {
      case SarfTermType.PAST_TENSE.name:
        result = this.pastTense;
        break;
      case SarfTermType.PRESENT_TENSE.name:
        result = this.presentTense;
        break;
      case SarfTermType.ACTIVE_PARTICIPLE_MASCULINE.name:
        result = this.activeParticipleMasculine;
        break;
      case SarfTermType.ACTIVE_PARTICIPLE_FEMININE.name:
        result = this.activeParticipleFeminine;
        break;
      case SarfTermType.PAST_PASSIVE_TENSE.name:
        result = this.pastPassiveTense;
        break;
      case SarfTermType.PRESENT_PASSIVE_TENSE.name:
        result = this.presentPassiveTense;
        break;
      case SarfTermType.PASSIVE_PARTICIPLE_MASCULINE.name:
        result = this.passiveParticipleMasculine;
        break;
      case SarfTermType.PASSIVE_PARTICIPLE_FEMININE.name:
        result = this.passiveParticipleFeminine;
        break;
      case SarfTermType.IMPERATIVE.name:
        result = this.imperative;
        break;
      case SarfTermType.FORBIDDING.name:
        result = this.forbidding;
        break;
      case SarfTermType.VERBAL_NOUN.name:
        result = this.verbalNouns;
        break;
      case SarfTermType.NOUN_OF_PLACE_AND_TIME.name:
        result = this.adverbs;
        break;
    }
    return result;
  }

  setConjugation(type: SarfTermType, group: NounConjugationGroup | VerbConjugationGroup) {
    switch (type.name) {
      case SarfTermType.PAST_TENSE.name:
        this.pastTense = <VerbConjugationGroup>group;
        break;
      case SarfTermType.PRESENT_TENSE.name:
        this.presentTense = <VerbConjugationGroup>group;
        break;
      case SarfTermType.ACTIVE_PARTICIPLE_MASCULINE.name:
        this.activeParticipleMasculine = <NounConjugationGroup>group;
        break;
      case SarfTermType.ACTIVE_PARTICIPLE_FEMININE.name:
        this.activeParticipleFeminine = <NounConjugationGroup>group;
        break;
      case SarfTermType.PAST_PASSIVE_TENSE.name:
        this.pastPassiveTense = <VerbConjugationGroup>group;
        break;
      case SarfTermType.PRESENT_PASSIVE_TENSE.name:
        this.presentPassiveTense = <VerbConjugationGroup>group;
        break;
      case SarfTermType.PASSIVE_PARTICIPLE_MASCULINE.name:
        this.passiveParticipleMasculine = <NounConjugationGroup>group;
        break;
      case SarfTermType.PASSIVE_PARTICIPLE_FEMININE.name:
        this.passiveParticipleFeminine = <NounConjugationGroup>group;
        break;
      case SarfTermType.IMPERATIVE.name:
        this.imperative = <VerbConjugationGroup>group;
        break;
      case SarfTermType.FORBIDDING.name:
        this.forbidding = <VerbConjugationGroup>group;
        break;
      case SarfTermType.VERBAL_NOUN.name:
        this.verbalNouns.push(<NounConjugationGroup>group);
        break;
      case SarfTermType.NOUN_OF_PLACE_AND_TIME.name:
        this.adverbs.push(<NounConjugationGroup>group);
        break;
    }
  }

  equals(other: DetailedConjugation) {
    return other && this.id === other.id;
  }

  compareTo(other: DetailedConjugation): number {
    let result = this.namedTemplate.compareTo(other.namedTemplate);
    if (result === 0) {
      result = this.rootLetters.compareTo(other.rootLetters);
    }
    return result;
  }

  private updateId() {
    if (this.namedTemplate && this.rootLetters) {
      this.id = this.namedTemplate.name + '_' + this.rootLetters.name;
    } else {
      this.id = IdGenerator.nextId();
    }
  }
}
