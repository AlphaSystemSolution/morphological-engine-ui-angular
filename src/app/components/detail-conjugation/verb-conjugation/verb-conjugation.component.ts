import { Component, Input, OnInit } from '@angular/core';
import { ConjugationTuple, VerbConjugationGroup, SarfTermType } from '../../model';
import { ArabicLabel, ConversationType, NumberType } from '../../../shared/model';

@Component({
  selector: 'app-verb-conjugation',
  templateUrl: './verb-conjugation.component.html',
  styleUrls: ['./verb-conjugation.component.css']
})
export class VerbConjugationComponent implements OnInit {

  @Input() group: VerbConjugationGroup;
  termType: string;
  values: ConjugationTuple[] = [];
  numbers: NumberType[] = [];
  constructor() { }

  ngOnInit() {
    this.termType = SarfTermType.getByName(this.group.termType).value;
    this.numbers = NumberType.VALUES;
    this.createValues();
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
