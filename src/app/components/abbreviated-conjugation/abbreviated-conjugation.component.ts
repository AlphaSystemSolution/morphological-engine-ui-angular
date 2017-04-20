import { Component, OnInit, Input } from '@angular/core';
import { ArabicConstants } from '../../model/common';
import { ArabicLetter } from '../../model/arabic-letter';
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

  private _abbreviatedConjugation: AbbreviatedConjugation;
  show: boolean;
  showPassive: boolean;
  title: string;
  translation: string;
  typeLabel1: string;
  typeLabel2: string;
  typeLabel3: string;
  verbalNounsText: string;
  adverbsText: string;

  constructor() { }

  ngOnInit() {
    this.updateTexts();
  }

  @Input() get abbreviatedConjugation(): AbbreviatedConjugation {
    return this._abbreviatedConjugation;
  }

  set abbreviatedConjugation(value: AbbreviatedConjugation) {
    this._abbreviatedConjugation = value;
    this.updateTexts();
  }

  private concatenatedStringWithAnd(values: string[]): string {
    if (!values) {
      return null;
    }
    let result = values[0];
    for (let i = 1; i < values.length; i++) {
      result += ArabicConstants.AND_SPACE.label + values[i];
    }

    return result;
  }

  private updateTexts() {
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
      this.showPassive = this.abbreviatedConjugation.showPassiveLine;
      this.verbalNounsText = this.concatenatedStringWithAnd(this.abbreviatedConjugation.verbalNouns);
      this.adverbsText = this.concatenatedStringWithAnd(this.abbreviatedConjugation.adverbs);
    } else {
      this.title = null;
      this.translation = null;
      this.typeLabel1 = null;
      this.typeLabel2 = null;
      this.typeLabel3 = null;
      this.showPassive = null;
      this.verbalNounsText = null;
      this.adverbsText = null;
    }
  }

}
