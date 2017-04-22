export class ConjugationTuple {
  private _type: string;
  constructor(public singular: string, public dual: string, public plural: string) { }

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
  constructor(public termType: string, public masculineThirdPerson: ConjugationTuple, public feminineThirdPerson: ConjugationTuple,
    public masculineSecondPerson: ConjugationTuple, public feminineSecondPerson: ConjugationTuple, public firstPerson: ConjugationTuple) { }
}

export class NounConjugationGroup implements ConjugationGroup {
  constructor(public termType: string, public nominative: ConjugationTuple, public accusative: ConjugationTuple,
    public genitive: ConjugationTuple) { }
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
}
