import { ConjugationHeader } from './conjugation-header';

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
}
