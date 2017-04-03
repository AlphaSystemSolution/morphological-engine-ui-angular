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
  showPassive: boolean;
  title: string;
  translation: string;
  typeLabel1: string;
  typeLabel2: string;
  typeLabel3: string;

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
      this.showPassive = this.abbreviatedConjugation.passiveLine !== null;
    }
  }

}
