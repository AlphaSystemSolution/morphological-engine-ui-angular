import { ConversationType } from '../model/common';

export class SarfTermType {

  static getByName(name: string): SarfTermType {
    let result: SarfTermType;
    switch (name) {
      case 'PAST_TENSE':
        result = new SarfTermType('PAST_TENSE', 'فعل ماضي');
        break;
      case 'PRESENT_TENSE':
        result = new SarfTermType('PRESENT_TENSE', 'فعل مضارع');
        break;
      case 'VERBAL_NOUN':
        result = new SarfTermType('VERBAL_NOUN', 'مصدر');
        break;
      case 'ACTIVE_PARTICIPLE_MASCULINE':
        result = new SarfTermType('ACTIVE_PARTICIPLE_MASCULINE', 'إسم فاعل مذكر');
        break;
      case 'ACTIVE_PARTICIPLE_FEMININE':
        result = new SarfTermType('ACTIVE_PARTICIPLE_FEMININE', 'إسم فاعل مؤنث');
        break;
      case 'PAST_PASSIVE_TENSE':
        result = new SarfTermType('PAST_PASSIVE_TENSE', 'فعل ماضي مبني على المجهول');
        break;
      case 'PRESENT_PASSIVE_TENSE':
        result = new SarfTermType('PRESENT_PASSIVE_TENSE', 'فعل مضارع مبني على المجهول');
        break;
      case 'PASSIVE_PARTICIPLE_MASCULINE':
        result = new SarfTermType('PASSIVE_PARTICIPLE_MASCULINE', 'إسم مفعول مذكر');
        break;
      case 'PASSIVE_PARTICIPLE_FEMININE':
        result = new SarfTermType('PASSIVE_PARTICIPLE_FEMININE', 'إسم مفعول مؤنث');
        break;
      case 'IMPERATIVE':
        result = new SarfTermType('IMPERATIVE', 'أمر');
        break;
      case 'FORBIDDING':
        result = new SarfTermType('FORBIDDING', 'نهي');
        break;
      case 'NOUN_OF_PLACE_AND_TIME':
        result = new SarfTermType('NOUN_OF_PLACE_AND_TIME', 'ظرف');
        break;
    }
    return result;
  }

  constructor(public name: string, public value: string) { }
}

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

export class RootLetters {
  constructor(public id: string, public displayName: string, public firstRadical: string, public secondRadical: string,
    public thirdRadical: string, public fourthRadical: string, public name: string, public empty: string) { }
}

export class ChartMode {
  constructor(public template: string, public rootType: string, public verbType: string, public weakVerbType: string) { }
}

export class ConjugationHeader {
  constructor(public rootLetters: RootLetters, public chartMode: ChartMode, public baseWord: string, public pastTenseRoot: string,
    public presentTenseRoot: string, public translation: string, public title: string, public typeLabel1: string,
    public typeLabel2: string, public typeLabel3: string) { }
}

export class AbbreviatedConjugation {
  public id: string;
  public conjugationHeader: ConjugationHeader;
  public pastTense: string;
  public presentTense: string;
  public activeParticiple: string;
  public pastPassiveTense: string;
  public presentPassiveTense: string;
  public passiveParticiple: string;
  public imperative: string;
  public forbidding: string;
  public verbalNouns: string[];
  public adverbs: string[];

  get showPassiveLine(): boolean {
    return this.pastPassiveTense !== null || this.presentPassiveTense !== null || this.passiveParticiple !== null;
  }
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
