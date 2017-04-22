import { Component, Input, OnInit } from '@angular/core';
import { SarfTermType } from '../../../model/sarf-term-type';
import { ConjugationTuple, NounConjugationGroup } from '../../../model/detailed-conjugation';
import { NounStatus, NumberType } from '../../../model/common';

@Component({
  selector: 'app-noun-conjugation',
  templateUrl: './noun-conjugation.component.html',
  styleUrls: ['./noun-conjugation.component.css']
})
export class NounConjugationComponent implements OnInit {

  @Input() group: NounConjugationGroup;
  termType: string;
  values: ConjugationTuple[] = [];
  numbers: NumberType[] = [];
  constructor() { }

  ngOnInit() {
    this.termType = SarfTermType.getByName(this.group.termType).label;
    this.numbers = NumberType.VALUES;
    this.createValues();
  }

  private addTuple(tuple: ConjugationTuple, status: NounStatus) {
    if (tuple) {
      tuple.type = status.label;
      this.values.push(tuple);
    }
  }

  private createValues() {
    this.addTuple(this.group.nominative, NounStatus.NOMINATIVE);
    this.addTuple(this.group.accusative, NounStatus.ACCUSATIVE);
    this.addTuple(this.group.genitive, NounStatus.GENITIVE);
  }

}
