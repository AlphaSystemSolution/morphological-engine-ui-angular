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

  private _group: NounConjugationGroup;
  @Input() collapsed = false;
  termType: string;
  values: ConjugationTuple[] = [];
  numbers: NumberType[] = [];
  constructor() { }

  ngOnInit() {
    this.numbers = NumberType.VALUES;
  }

  @Input() get group(): NounConjugationGroup {
    return this._group;
  }

  set group(value: NounConjugationGroup) {
    this._group = value;
    if (this.group) {
      if (this.group.termType) {
        this.termType = SarfTermType.getByName(this.group.termType).label;
      }
      this.createValues();
    }
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
