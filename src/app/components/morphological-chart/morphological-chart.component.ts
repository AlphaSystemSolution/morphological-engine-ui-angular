import { Component, OnInit } from '@angular/core';
import { AbbreviatedConjugation } from '../model';

@Component({
  selector: 'app-morphological-chart',
  templateUrl: './morphological-chart.component.html',
  styleUrls: ['./morphological-chart.component.css']
})
export class MorphologicalChartComponent implements OnInit {

  private _abbreviatedConjugations: AbbreviatedConjugation[];

  get abbreviatedConjugations(): AbbreviatedConjugation[] {
    return this._abbreviatedConjugations;
  }

  set abbreviatedConjugations(value: AbbreviatedConjugation[]) {
    this._abbreviatedConjugations = value;
  }

  ngOnInit() {
  }

}
