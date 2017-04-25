import { Component, OnInit, Input } from '@angular/core';
import { ApplicationControllerService } from '../../application-controller.service';
import { ArabicConstants, ArabicLabel } from '../../model/common';
import { ArabicLetter } from '../../model/arabic-letter';
import { ConjugationHeader } from '../../model/conjugation-header';
import { AbbreviatedConjugation } from '../../model/abbreviated-conjugation';
import { NounConjugationGroup, VerbConjugationGroup } from '../../model/detailed-conjugation';
import { SarfTermType } from '../../model/sarf-term-type';

@Component({
  selector: 'app-abbreviated-conjugation',
  templateUrl: './abbreviated-conjugation.component.html',
  styleUrls: ['./abbreviated-conjugation.component.css']
})
export class AbbreviatedConjugationComponent implements OnInit {

  private _abbreviatedConjugation: AbbreviatedConjugation;
  @Input() collaspPanel = false;
  @Input() collaspDetailedConjugationPanel = true;
  show: boolean;
  showPassive: boolean;
  title: string;
  translation: string;
  typeLabel1: string;
  typeLabel2: string;
  typeLabel3: string;
  verbalNouns: ArabicLabel[][];
  adverbs: ArabicLabel[][];
  nounGroup: NounConjugationGroup;
  verbGroup: VerbConjugationGroup;

  constructor(private applicationController: ApplicationControllerService) { }

  ngOnInit() {
    this.updateTexts();
  }

  @Input() get abbreviatedConjugation(): AbbreviatedConjugation {
    return this._abbreviatedConjugation;
  }

  set abbreviatedConjugation(value: AbbreviatedConjugation) {
    this._abbreviatedConjugation = value;
    this.collaspPanel = false;
    this.collaspDetailedConjugationPanel = true;
    this.nounGroup = null;
    this.verbGroup = null;
    this.updateTexts();
  }

  public displayConjugation(type: string) {
    this.collaspPanel = true;
    this.collaspDetailedConjugationPanel = false;
    this.nounGroup = null;
    this.verbGroup = null;
    const template = this.abbreviatedConjugation.conjugationHeader.chartMode.template;
    const rootLetters = this.abbreviatedConjugation.conjugationHeader.rootLetters;
    const d = this.applicationController.doDetailedConjugation(type, template, rootLetters, null, false);
    d.subscribe(
      data => this.initializeDetailedConjugation(data[0]),
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  handleToggle(event) {
    this.collaspPanel = event.collapsed;
    this.collaspDetailedConjugationPanel = !event.collapsed;
  }

  private initializeDetailedConjugation(data) {
    const termType = data.termType;
    switch (termType) {
      case 'PAST_TENSE':
      case 'PRESENT_TENSE':
      case 'PAST_PASSIVE_TENSE':
      case 'PRESENT_PASSIVE_TENSE':
      case 'IMPERATIVE':
      case 'FORBIDDING':
        this.verbGroup = <VerbConjugationGroup>data;
        break;
      default:
        this.nounGroup = <NounConjugationGroup>data;
        break;
    }
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
      this.showPassive = this.abbreviatedConjugation.pastPassiveTense !== null
        || this.abbreviatedConjugation.presentPassiveTense !== null
        || this.abbreviatedConjugation.passiveParticipleMasculine !== null;
      this.verbalNouns = this.slice(this.abbreviatedConjugation.verbalNouns);
      this.adverbs = this.slice(this.abbreviatedConjugation.adverbs);
    } else {
      this.title = null;
      this.translation = null;
      this.typeLabel1 = null;
      this.typeLabel2 = null;
      this.typeLabel3 = null;
      this.showPassive = false;
      this.verbalNouns = null;
      this.adverbs = null;
    }
  }

  private slice(srcArray: ArabicLabel[]) {
    if (!srcArray || srcArray.length <= 0) {
      return null;
    }
    const result: ArabicLabel[][] = [];
    let start = 0;
    let end = 2;
    while (start < srcArray.length) {
      let subArray = srcArray.slice(start, end);
      subArray = subArray.reverse();
      while (subArray.length % 2 !== 0) {
        subArray.splice(0, 0, null);
      }
      result.push(subArray);
      start = end;
      end += 2;
    }
    return result;
  }

}
