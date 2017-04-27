import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { ApplicationControllerService } from '../../application-controller.service';
import { ArabicConstants, ArabicLabel } from '../../model/common';
import { ArabicLetter } from '../../model/arabic-letter';
import { ConjugationHeader } from '../../model/conjugation-header';
import { AbbreviatedConjugation, ConjugationLabel } from '../../model/abbreviated-conjugation';
import { ToggleSelectorComponent } from '../../shared/toggle-selector/toggle-selector.component';
import { NounConjugationGroup, VerbConjugationGroup } from '../../model/detailed-conjugation';
import { SarfTermType } from '../../model/sarf-term-type';

@Component({
  selector: 'app-abbreviated-conjugation',
  templateUrl: './abbreviated-conjugation.component.html',
  styleUrls: ['./abbreviated-conjugation.component.css']
})
export class AbbreviatedConjugationComponent implements OnInit {

  private _abbreviatedConjugation: AbbreviatedConjugation;
  @ViewChildren(ToggleSelectorComponent) buttons: QueryList<ToggleSelectorComponent>;
  @Input() collaspPanel = false;
  @Input() collaspDetailedConjugationPanel = true;
  show: boolean;
  title: string;
  translation: string;
  typeLabel1: string;
  typeLabel2: string;
  typeLabel3: string;
  labels: ConjugationLabel[][] = [];
  nounGroup: NounConjugationGroup;
  verbGroup: VerbConjugationGroup;

  constructor(private applicationController: ApplicationControllerService) { }

  ngOnInit() {
    this.update();
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
    this.update();
  }

  handleToggle(event) {
    this.collaspPanel = event.collapsed;
    this.collaspDetailedConjugationPanel = !event.collapsed;
  }

  handleChange(event, label: ConjugationLabel) {
    if (!event.checked) {
      return;
    }
    this.displayConjugation(label.type);
    this.buttons.forEach(button => button.select = false);
  }

  private displayConjugation(type: SarfTermType) {
    this.collaspPanel = true;
    this.collaspDetailedConjugationPanel = false;
    this.nounGroup = null;
    this.verbGroup = null;
    const template = this.abbreviatedConjugation.namedTemplate;
    const rootLetters = this.abbreviatedConjugation.rootLetters;
    this.applicationController.doDetailedConjugation(type, template, rootLetters, null, false)
      .subscribe(data => this.handleData(type, template, rootLetters, data), err => this.handleError(err));
  }

  private handleData(type, template, rootLetters, data) {
    if (type.isVerbType) {
      this.verbGroup = new VerbConjugationGroup(data[0]);
      this.applicationController.updateDetailedConjugation(type, template, rootLetters, this.verbGroup);
    } else {
      this.nounGroup = new NounConjugationGroup(data[0]);
      this.applicationController.updateDetailedConjugation(type, template, rootLetters, this.nounGroup);
    }
  }

  private handleError(err) {
    console.log(JSON.stringify(err));
  }

  private update() {
    if (this.buttons) {
      this.buttons.forEach(button => button.select = false);
    }
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
      this.labels = [];

      this.addLabels(this.abbreviatedConjugation.presentTense, this.abbreviatedConjugation.pastTense);

      const verbalNouns = this.slice(this.abbreviatedConjugation.verbalNouns);
      if (verbalNouns) {
        verbalNouns.forEach(items => this.labels.push(items));
      }

      this.addLabels(this.abbreviatedConjugation.activeParticipleFeminine, this.abbreviatedConjugation.activeParticipleMasculine);
      this.addLabels(this.abbreviatedConjugation.presentPassiveTense, this.abbreviatedConjugation.pastPassiveTense);
      this.addLabels(this.abbreviatedConjugation.passiveParticipleFeminine, this.abbreviatedConjugation.passiveParticipleMasculine);
      this.addLabels(this.abbreviatedConjugation.forbidding, this.abbreviatedConjugation.imperative);

      const adverbs = this.slice(this.abbreviatedConjugation.adverbs);
      if (adverbs) {
        adverbs.forEach(items => this.labels.push(items));
      }
    } else {
      this.title = null;
      this.translation = null;
      this.typeLabel1 = null;
      this.typeLabel2 = null;
      this.typeLabel3 = null;
      this.labels = [];
    }
  }

  private addLabel(label: ConjugationLabel, labelGroup: ConjugationLabel[]) {
    if (label) {
      labelGroup.push(label);
    } else {
      labelGroup.push(null);
    }
  }

  private addLabels(leftLabel: ConjugationLabel, rightLabel: ConjugationLabel) {
    if (leftLabel === null && rightLabel === null) {
      return;
    }
    const labelGroup: ConjugationLabel[] = [];
    this.addLabel(leftLabel, labelGroup);
    this.addLabel(rightLabel, labelGroup);
    this.labels.push(labelGroup);
  }

  private slice(srcArray: ConjugationLabel[]) {
    if (!srcArray || srcArray.length <= 0) {
      return null;
    }
    const result: ConjugationLabel[][] = [];
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
