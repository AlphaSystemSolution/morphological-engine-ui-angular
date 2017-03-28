import { Component, Input, OnInit } from '@angular/core';
import {
  ConjugationTuple,
  DetailedConjugation,
  DetailedConjugationRow,
  NounConjugationGroup,
  NounDetailedConjugationPair,
  SarfTermType,
  SimpleDetailedConjugationGroup,
  VerbConjugationGroup,
  VerbDetailedConjugationPair
} from '../model';

@Component({
  selector: 'app-detail-conjugation',
  templateUrl: './detail-conjugation.component.html',
  styleUrls: ['./detail-conjugation.component.css']
})
export class DetailConjugationComponent implements OnInit {

  @Input() detailedConjugation: DetailedConjugation;
  show: boolean;
  groups: SimpleDetailedConjugationGroup[] = [];

  constructor() { }

  ngOnInit() {
    this.show = this.detailedConjugation !== null;
    if (this.show) {
      let index = 0;
      this.groups[index++] = this.createVerbGroup(this.detailedConjugation.activeTensePair);
      this.groups[index++] = this.createNounGroup(this.detailedConjugation.activeParticiplePair);
      this.groups[index++] = this.createVerbGroup(this.detailedConjugation.passiveTensePair);
      this.groups[index++] = this.createNounGroup(this.detailedConjugation.passiveParticiplePair);
      this.groups[index++] = this.createVerbGroup(this.detailedConjugation.imperativeAndForbiddingPair);
    }
  }

  private createVerbGroup(pair: VerbDetailedConjugationPair): SimpleDetailedConjugationGroup {
    const leftGroup: VerbConjugationGroup = pair.leftSideConjugations;
    const rightGroup: VerbConjugationGroup = pair.rightSideConjugations;
    const leftTerm: SarfTermType = SarfTermType.getByName(leftGroup.termType);
    const rightTerm: SarfTermType = SarfTermType.getByName(rightGroup.termType);

    const rows: DetailedConjugationRow[] = [];
    let index = 0;

    let row = this.createDetailedConjugationRow(leftGroup.masculineThirdPerson, rightGroup.masculineThirdPerson);
    if (row !== null) {
      rows[index++] = row;
    }

    row = this.createDetailedConjugationRow(leftGroup.feminineThirdPerson, rightGroup.feminineThirdPerson);
    if (row !== null) {
      rows[index++] = row;
    }

    row = this.createDetailedConjugationRow(leftGroup.masculineSecondPerson, rightGroup.masculineSecondPerson);
    if (row !== null) {
      rows[index++] = row;
    }

    row = this.createDetailedConjugationRow(leftGroup.feminineSecondPerson, rightGroup.feminineSecondPerson);
    if (row !== null) {
      rows[index++] = row;
    }

    row = this.createDetailedConjugationRow(leftGroup.firstPerson, rightGroup.firstPerson);
    if (row !== null) {
      rows[index++] = row;
    }
    return new SimpleDetailedConjugationGroup(leftTerm.value, 'morphological-chart', rightTerm.value, 'morphological-chart', rows);
  }

  private createNounGroup(pair: NounDetailedConjugationPair): SimpleDetailedConjugationGroup {
    const leftGroup: NounConjugationGroup = pair.leftSideConjugations;
    const rightGroup: NounConjugationGroup = pair.rightSideConjugations;
    const rightTerm = SarfTermType.getByName(rightGroup.termType).value;
    const rightSideClass = 'morphological-chart';
    let leftTerm: string = null;
    let leftSideClass = 'morphological-chart-no-border';
    if (leftGroup && leftGroup.termType) {
      leftTerm = SarfTermType.getByName(leftGroup.termType).value;
      leftSideClass = 'morphological-chart';
    }
    const rows: DetailedConjugationRow[] = [];
    let index = 0;

    let rightTuple = rightGroup.nominative;
    let leftTuple = (leftGroup && leftGroup.nominative) ? leftGroup.nominative : new ConjugationTuple(null, null, null);
    let row = this.createDetailedConjugationRow(leftTuple, rightTuple);
    if (row !== null) {
      rows[index++] = row;
    }

    rightTuple = rightGroup.accusative;
    leftTuple = (leftGroup && leftGroup.accusative) ? leftGroup.accusative : new ConjugationTuple(null, null, null);
    row = this.createDetailedConjugationRow(leftTuple, rightTuple);
    if (row !== null) {
      rows[index++] = row;
    }

    rightTuple = rightGroup.genitive;
    leftTuple = (leftGroup && leftGroup.genitive) ? leftGroup.genitive : new ConjugationTuple(null, null, null);
    row = this.createDetailedConjugationRow(leftTuple, rightTuple);
    if (row !== null) {
      rows[index++] = row;
    }

    return new SimpleDetailedConjugationGroup(leftTerm, leftSideClass, rightTerm, rightSideClass, rows);
  }

  private createValues(tuple: ConjugationTuple): string[] {
    const result: string[] = [];

    let value = tuple.plural;
    value = value === null ? null : value;
    result[0] = value;

    value = tuple.dual;
    value = value === null ? null : value;
    result[1] = value;

    value = tuple.singular;
    value = value === null ? null : value;
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
