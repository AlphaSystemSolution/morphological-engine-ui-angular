import { Component, OnInit, Input } from '@angular/core';
import {
  ActiveLine,
  AdverbLine,
  AbbreviatedConjugation,
  ConjugationHeader,
  ImperativeAndForbiddingLine,
  PassiveLine
} from '../model';

@Component({
  selector: 'app-abbreviated-conjugation',
  templateUrl: './abbreviated-conjugation.component.html',
  styleUrls: ['./abbreviated-conjugation.component.css']
})
export class AbbreviatedConjugationComponent implements OnInit {

  @Input() abbreviatedConjugation: AbbreviatedConjugation;
  show: boolean;
  showActive: boolean;
  showPassive: boolean;
  showImperativeAndForbidding: boolean;
  showAdverb: boolean;
  title: string;
  translation: string;
  typeLabel1: string;
  typeLabel2: string;
  typeLabel3: string;
  activeLine: string[] = [];
  passiveLine: string[] = [];
  imperativeAndForbiddingLine: string[] = [];
  adverbLine: string[] = [];
  constructor() { }

  ngOnInit() {
    this.show = this.abbreviatedConjugation != null;
    if (this.show) {
      const conjugationHeader = this.abbreviatedConjugation.conjugationHeader;
      if (conjugationHeader) {
        this.title = conjugationHeader.title;
        this.translation = conjugationHeader.translation;
        this.typeLabel1 = conjugationHeader.typeLabel1;
        this.typeLabel2 = conjugationHeader.typeLabel2;
        this.typeLabel3 = conjugationHeader.typeLabel3;
      }

      const activeLine = this.abbreviatedConjugation.activeLine;
      this.showActive = activeLine !== null;
      if (this.showActive) {
        this.activeLine[0] = activeLine.activeParticipleValue;
        this.activeLine[1] = activeLine.verbalNoun;
        this.activeLine[2] = activeLine.presentTense;
        this.activeLine[3] = activeLine.pastTense;
      }
      const passiveLine = this.abbreviatedConjugation.passiveLine;
      this.showPassive = passiveLine !== null;
      if (this.showPassive) {
        this.passiveLine[0] = passiveLine.passiveParticipleMasculine;
        this.passiveLine[1] = passiveLine.verbalNoun;
        this.passiveLine[2] = passiveLine.presentPassiveTense;
        this.passiveLine[3] = passiveLine.pastPassiveTense;
      }
      const imperativeAndForbiddingLine = this.abbreviatedConjugation.imperativeAndForbiddingLine;
      this.showImperativeAndForbidding = imperativeAndForbiddingLine !== null;
      if (this.showImperativeAndForbidding) {
        this.imperativeAndForbiddingLine[0] = imperativeAndForbiddingLine.forbiddingWithPrefix;
        this.imperativeAndForbiddingLine[1] = imperativeAndForbiddingLine.imperativeWithPrefix;
      }
      const adverbLine = this.abbreviatedConjugation.adverbLine;
      this.showAdverb = adverbLine !== null;
      if (this.showAdverb) {
        this.adverbLine[0] = adverbLine.adverb;
      }
    }
  }

}
