import { Component, Input, OnInit } from '@angular/core';
import {
  ConjugationTuple,
  DetailedConjugation,
  DetailedConjugationRow,
  SarfTermType,
  SimpleDetailedConjugationGroup,
  VerbDetailedConjugationPair,
  VerbConjugationGroup
} from '../model';

@Component({
  selector: 'app-detail-conjugation',
  templateUrl: './detail-conjugation.component.html',
  styleUrls: ['./detail-conjugation.component.css']
})
export class DetailConjugationComponent implements OnInit {

  @Input() detailedConjugation: DetailedConjugation;
  show: boolean;
  activeTensePairGroup: SimpleDetailedConjugationGroup;

  constructor() { }

  ngOnInit() {
    this.show = this.detailedConjugation !== null;
    if (this.show) {
      const pair = this.detailedConjugation.activeTensePair;
    }
  }

  private createVerbGroup(pair: VerbDetailedConjugationPair): SimpleDetailedConjugationGroup {
    const leftGroup: VerbConjugationGroup = pair.leftSideConjugations;
    const rightGroup: VerbConjugationGroup = pair.rightSideConjugations;
    const leftTerm: SarfTermType = SarfTermType.getByName(leftGroup.termType);
    const rightTerm: SarfTermType = SarfTermType.getByName(rightGroup.termType);

    const rows: DetailedConjugationRow[] = [];

    let index = 0;

    let row: DetailedConjugationRow = this.createDetailedConjugationRow(leftGroup.masculineThirdPerson, rightGroup.masculineThirdPerson);
    if (row !== null) {
      rows[index] = row;
      index++;
    }

    row = this.createDetailedConjugationRow(leftGroup.feminineThirdPerson, rightGroup.feminineThirdPerson);
    if (row !== null) {
      rows[index] = row;
      index++;
    }

    row = this.createDetailedConjugationRow(leftGroup.masculineSecondPerson, rightGroup.masculineSecondPerson);
    if (row !== null) {
      rows[index] = row;
      index++;
    }

    row = this.createDetailedConjugationRow(leftGroup.feminineSecondPerson, rightGroup.feminineSecondPerson);
    if (row !== null) {
      rows[index] = row;
      index++;
    }

    row = this.createDetailedConjugationRow(leftGroup.firstPerson, rightGroup.firstPerson);
    if (row !== null) {
      rows[index] = row;
      index++;
    }
    return new SimpleDetailedConjugationGroup(leftTerm, rightTerm, rows);
  }

  private createValues(tuple: ConjugationTuple): string[] {
    const result: string[] = [];

    let value = tuple.plural;
    value = value === null ? ' ' : value;
    result[0] = value;

    value = tuple.dual;
    value = value === null ? ' ' : value;
    result[1] = value;

    value = tuple.singular;
    value = value === null ? ' ' : value;
    result[2] = value;
    return result;
  }

  private createDetailedConjugationRow(leftTuple: ConjugationTuple, rightTuple: ConjugationTuple): DetailedConjugationRow {
    if (leftTuple === null && rightTuple === null) {
      return null;
    }
    return new DetailedConjugationRow(this.createValues(leftTuple), this.createValues(rightTuple));
  }

}
