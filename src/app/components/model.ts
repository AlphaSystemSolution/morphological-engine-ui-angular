import { ConversationType } from '../model/common';
import { AbbreviatedConjugation } from '../model/abbreviated-conjugation';

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

export class VerbDetailedConjugationPair {
  constructor(public leftSideConjugations: VerbConjugationGroup, public rightSideConjugations: VerbConjugationGroup) { }
}

export class NounConjugationGroup implements ConjugationGroup {
  constructor(public termType: string, public nominative: ConjugationTuple, public accusative: ConjugationTuple,
    public genitive: ConjugationTuple) { }
}

export class NounDetailedConjugationPair {
  constructor(public leftSideConjugations: NounConjugationGroup, public rightSideConjugations: NounConjugationGroup) { }
}

export class ActiveLine {
  constructor(public pastTense: string, public presentTense: string, public verbalNouns: string[], public verbalNoun: string,
    public activeParticipleMasculine: string, public activeParticipleValue: string) { }
}

export class PassiveLine {
  constructor(public pastPassiveTense: string, public presentPassiveTense: string, public verbalNouns: string[], public verbalNoun: string,
    public passiveParticipleMasculine: string, public passiveParticipleValue: string) { }
}

export class ImperativeAndForbiddingLine {
  constructor(public imperative: string, public imperativeWithPrefix: string, public forbidding: string,
    public forbiddingWithPrefix: string) { }
}

export class AdverbLine {
  constructor(public adverbs: string[], public adverb: string) { }
}

export class DetailedConjugation {
  constructor(public activeTensePair: VerbDetailedConjugationPair, public verbalNounPairs: NounDetailedConjugationPair[],
    public activeParticiplePair: NounDetailedConjugationPair, public passiveTensePair: VerbDetailedConjugationPair,
    public passiveParticiplePair: NounDetailedConjugationPair, public imperativeAndForbiddingPair: VerbDetailedConjugationPair,
    public adverbPairs: NounDetailedConjugationPair[]) { }

}

export class MorphologicalChart {
  constructor(public abbreviatedConjugation: AbbreviatedConjugation, public detailedConjugation: DetailedConjugation) { }
}
