import { Component, Input, OnInit } from '@angular/core';
import {
  ConjugationTuple,
  DetailedConjugation,
  NounConjugationGroup,
  NounDetailedConjugationPair,
  VerbConjugationGroup,
  VerbDetailedConjugationPair
} from '../model';

@Component({
  selector: 'app-detail-conjugation',
  templateUrl: './detail-conjugation.component.html',
  styleUrls: ['./detail-conjugation.component.css']
})
export class DetailConjugationComponent implements OnInit {

  @Input() detailedConjugation: DetailedConjugation;
  @Input() title: string;
  show: boolean;
  pastTense: VerbConjugationGroup;
  presentTense: VerbConjugationGroup;
  masculineActiveParticiple: NounConjugationGroup;
  feminineActiveParticiple: NounConjugationGroup;
  pastPassiveTense: VerbConjugationGroup;
  presentPassiveTense: VerbConjugationGroup;
  masculinePassiveParticiple: NounConjugationGroup;
  femininePassiveParticiple: NounConjugationGroup;
  imperative: VerbConjugationGroup;
  forbidding: VerbConjugationGroup;
  verbalNouns: NounConjugationGroup[];
  adverbs: NounConjugationGroup[];

  constructor() { }

  ngOnInit() {
    this.show = this.detailedConjugation !== null;
    if (this.show) {
      this.pastTense = this.detailedConjugation.activeTensePair.rightSideConjugations;
      this.presentTense = this.detailedConjugation.activeTensePair.leftSideConjugations;

      this.masculineActiveParticiple = this.detailedConjugation.activeParticiplePair.rightSideConjugations;
      this.feminineActiveParticiple = this.detailedConjugation.activeParticiplePair.leftSideConjugations;

      const passiveTensePair = this.detailedConjugation.passiveTensePair;
      if (passiveTensePair) {
        this.pastPassiveTense = passiveTensePair.rightSideConjugations;
        this.presentPassiveTense = passiveTensePair.leftSideConjugations;
      }

      const passiveParticiplePair = this.detailedConjugation.passiveParticiplePair;
      if (passiveParticiplePair) {
        this.masculinePassiveParticiple = passiveParticiplePair.rightSideConjugations;
        this.femininePassiveParticiple = passiveParticiplePair.leftSideConjugations;
      }

      this.imperative = this.detailedConjugation.imperativeAndForbiddingPair.rightSideConjugations;
      this.forbidding = this.detailedConjugation.imperativeAndForbiddingPair.leftSideConjugations;

      this.verbalNouns = this.getNounArrayTypeValues(this.detailedConjugation.verbalNounPairs);
      this.adverbs = this.getNounArrayTypeValues(this.detailedConjugation.adverbPairs);
    }
  }

  private getNounArrayTypeValues(pairs: NounDetailedConjugationPair[]): NounConjugationGroup[] {
    if (!pairs) {
      return [];
    }
    const groups: NounConjugationGroup[] = [];
    pairs.forEach(pair => {
      if (pair) {
        let group = pair.rightSideConjugations;
        if (group) {
          groups.push(group);
        }
        group = pair.leftSideConjugations;
        if (group) {
          groups.push(group);
        }
      }
    });
    return groups;
  }

}
