import { Component, OnInit, Input } from '@angular/core';
import { ArabicConstants, ArabicLetter } from '../../shared/model';
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
  abbreviatedConjugationText: string;

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
      this.abbreviatedConjugationText = activeLine.pastTense + ' ' + activeLine.presentTense;

      const verbalNoun = activeLine.verbalNoun;
      if (verbalNoun) {
        this.abbreviatedConjugationText += ' ' + activeLine.verbalNoun;
      }
      this.abbreviatedConjugationText += ' ' + activeLine.activeParticipleValue;

      const passiveLine = this.abbreviatedConjugation.passiveLine;
      if (passiveLine) {
        this.abbreviatedConjugationText += ' ' + ArabicLetter.WAW.label + ' ' + passiveLine.pastPassiveTense + ' ' +
          passiveLine.presentPassiveTense;
        if (verbalNoun) {
          this.abbreviatedConjugationText += ' ' + activeLine.verbalNoun;
        }
        this.abbreviatedConjugationText += ' ' + passiveLine.passiveParticipleValue;
      }

      const imperativeAndForbiddingLine = this.abbreviatedConjugation.imperativeAndForbiddingLine;
      this.abbreviatedConjugationText += ' ' + imperativeAndForbiddingLine.imperativeWithPrefix + ' ' +
        imperativeAndForbiddingLine.forbiddingWithPrefix + ' ';

      const adverbLine = this.abbreviatedConjugation.adverbLine;
      if (adverbLine) {
        this.abbreviatedConjugationText += ' ' + adverbLine.adverb;
      }
    }
  }

}
