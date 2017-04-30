import { Component, OnInit } from '@angular/core';
import { ApplicationControllerService } from '../../application-controller.service';
import { ArabicLabel, DisplayType } from '../../model/common';
import { ArabicLetter } from '../../model/arabic-letter';
import { AbbreviatedConjugation } from '../../model/abbreviated-conjugation';

@Component({
  selector: 'app-morphological-chart',
  templateUrl: './morphological-chart.component.html',
  styleUrls: ['./morphological-chart.component.css']
})
export class MorphologicalChartComponent implements OnInit {

  private _abbreviatedConjugations: AbbreviatedConjugation[];
  private _selectedAbbreviatedConjugation: AbbreviatedConjugation;
  private _selectedIndex = 0;
  displayType = DisplayType.LABEL_ONLY;

  constructor(private applicationControllerService: ApplicationControllerService) { }

  ngOnInit() {
  }

  get abbreviatedConjugations(): AbbreviatedConjugation[] {
    return this._abbreviatedConjugations;
  }

  set abbreviatedConjugations(value: AbbreviatedConjugation[]) {
    this._abbreviatedConjugations = value;
  }

  get selectedAbbreviatedConjugation(): AbbreviatedConjugation {
    return this._selectedAbbreviatedConjugation;
  }

  viewConjugation(index: number) {
    if (this.abbreviatedConjugations && this.abbreviatedConjugations.length > 0) {
      this._selectedAbbreviatedConjugation = this.abbreviatedConjugations[index];
    }
  }

}
