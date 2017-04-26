export class ConjugationTuple {
  private _type: string;
  public singular: string;
  public dual: string;
  public plural: string;

  static getTuple(value: any): ConjugationTuple {
    return value ? new ConjugationTuple(value) : null;
  }

  constructor(src?: any) {
    this.singular = src && src.singular || null;
    this.dual = src && src.dual || null;
    this.plural = src && src.plural || null;
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
    this.termType = src && src.termType || null;
    this.masculineThirdPerson = ConjugationTuple.getTuple(src && src.masculineThirdPerson || null);
    this.feminineThirdPerson = ConjugationTuple.getTuple(src && src.feminineThirdPerson || null);
    this.masculineSecondPerson = ConjugationTuple.getTuple(src && src.masculineSecondPerson || null);
    this.feminineSecondPerson = ConjugationTuple.getTuple(src && src.feminineSecondPerson || null);
    this.firstPerson = ConjugationTuple.getTuple(src && src.firstPerson || null);
  }
}

export class NounConjugationGroup implements ConjugationGroup {
  public termType: string;
  public nominative: ConjugationTuple;
  public accusative: ConjugationTuple;
  public genitive: ConjugationTuple;

  constructor(src?: any) {
    this.termType = src && src.termType || null;
    this.nominative = ConjugationTuple.getTuple(src && src.nominative || null);
    this.accusative = ConjugationTuple.getTuple(src && src.accusative || null);
    this.genitive = ConjugationTuple.getTuple(src && src.genitive || null);
  }
}

export class DetailedConjugation {
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

  private static getVerbConjugationGroup(src: any): VerbConjugationGroup {
    return src ? new VerbConjugationGroup(src) : null;
  }

  private static getNounConjugationGroup(src: any): NounConjugationGroup {
    return src ? new NounConjugationGroup(src) : null;
  }

  constructor(src?: any) {
    this.pastTense = DetailedConjugation.getVerbConjugationGroup(src && src.pastTense || null);
    this.presentTense = DetailedConjugation.getVerbConjugationGroup(src && src.presentTense || null);
    this.activeParticipleMasculine = DetailedConjugation.getNounConjugationGroup(src && src.activeParticipleMasculine || null);
    this.activeParticipleFeminine = DetailedConjugation.getNounConjugationGroup(src && src.activeParticipleFeminine || null);

    this.pastPassiveTense = DetailedConjugation.getVerbConjugationGroup(src && src.pastPassiveTense || null);
    this.pastPassiveTense = DetailedConjugation.getVerbConjugationGroup(src && src.pastPassiveTense || null);
    this.passiveParticipleMasculine = DetailedConjugation.getNounConjugationGroup(src && src.passiveParticipleMasculine || null);
    this.passiveParticipleFeminine = DetailedConjugation.getNounConjugationGroup(src && src.passiveParticipleFeminine || null);

    this.imperative = DetailedConjugation.getVerbConjugationGroup(src && src.imperative || null);
    this.forbidding = DetailedConjugation.getVerbConjugationGroup(src && src.forbidding || null);

    if (src && src.verbalNouns && src.verbalNouns.length > 0) {
      this.verbalNouns = [];
      src.verbalNouns.foreach(value => this.verbalNouns.push(DetailedConjugation.getNounConjugationGroup(value)));
    }

    if (src && src.adverbs && src.adverbs.length > 0) {
      this.adverbs = [];
      src.adverbs.foreach(value => this.adverbs.push(DetailedConjugation.getNounConjugationGroup(value)));
    }
  }
}
