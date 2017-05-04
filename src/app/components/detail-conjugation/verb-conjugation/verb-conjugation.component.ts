import { Component, Input, OnInit } from '@angular/core';
import { SarfTermType } from '../../../model/sarf-term-type';
import { ConjugationTuple, VerbConjugationGroup } from '../../../model/detailed-conjugation';
import { ConversationType, NumberType } from '../../../model/common';

@Component({
  selector: 'app-verb-conjugation',
  templateUrl: './verb-conjugation.component.html',
  styleUrls: ['./verb-conjugation.component.css']
})
export class VerbConjugationComponent implements OnInit {

  private _group: VerbConjugationGroup;
  @Input() collapsed = false;
  termType: string;
  values: ConjugationTuple[] = [];
  numbers: NumberType[] = [];
  constructor() { }

  ngOnInit() {
    this.numbers = NumberType.VALUES;
  }

  @Input() get group(): VerbConjugationGroup {
    return this._group;
  }

  set group(value: VerbConjugationGroup) {
    this._group = value;
    this.values = [];
    if (this.group) {
      if (this.group.termType) {
        this.termType = SarfTermType.getByName(this.group.termType).label;
      }
      this.createValues();
    }
  }

  private addTuple(tuple: ConjugationTuple, conversationType: ConversationType) {
    if (tuple) {
      tuple.type = conversationType.label;
      this.values.push(tuple);
    }
  }

  private createValues() {
    this.addTuple(this.group.masculineThirdPerson, ConversationType.THIRD_PERSON_MSCULINE);
    this.addTuple(this.group.feminineThirdPerson, ConversationType.THIRD_PERSON_FEMININE);
    this.addTuple(this.group.masculineSecondPerson, ConversationType.SECOND_PERSON_MSCULINE);
    this.addTuple(this.group.feminineSecondPerson, ConversationType.SECOND_PERSON_FEMININE);
    this.addTuple(this.group.firstPerson, ConversationType.FIRST_PERSON);
  }

}
