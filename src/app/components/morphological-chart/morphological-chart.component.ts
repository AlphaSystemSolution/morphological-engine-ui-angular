import { Component, OnInit } from '@angular/core';
import { ArabicLabel, DisplayType } from '../../model/common';
import { ArabicLetter } from '../../model/arabic-letter';
import { AbbreviatedConjugation } from '../model';

@Component({
  selector: 'app-morphological-chart',
  templateUrl: './morphological-chart.component.html',
  styleUrls: ['./morphological-chart.component.css']
})
export class MorphologicalChartComponent implements OnInit {

  private _abbreviatedConjugations: AbbreviatedConjugation[];
  private _selectedAbbreviatedConjugation: AbbreviatedConjugation;
  displayType = DisplayType.LABEL_ONLY;
  private _titles: ArabicLabel[] = [];

  ngOnInit() {
  }

  get abbreviatedConjugations(): AbbreviatedConjugation[] {
    return this._abbreviatedConjugations;
  }

  set abbreviatedConjugations(value: AbbreviatedConjugation[]) {
    this._abbreviatedConjugations = value;
    this.updateDropdownValues();
  }

  get selectedAbbreviatedConjugation(): AbbreviatedConjugation {
    return this._selectedAbbreviatedConjugation;
  }

  get titles(): ArabicLabel[] {
    return this._titles;
  }

  handleChange(event) {
    const selectedValue = <ArabicLabel>event.value;
    this._selectedAbbreviatedConjugation = this.abbreviatedConjugations.filter((value) => selectedValue.code === value.id)[0];
  }

  private updateDropdownValues() {
    this._titles = [];
    if (!this.abbreviatedConjugations) {
      return;
    }
    this.abbreviatedConjugations.forEach(ac => {
      const conjugationHeader = ac.conjugationHeader;
      const rootLetters = conjugationHeader.rootLetters;
      const rootLettersLabel = ArabicLetter.getByName(rootLetters.firstRadical).label +
        ArabicLetter.getByName(rootLetters.secondRadical).label
        + ArabicLetter.getByName(rootLetters.thirdRadical).label;
      const label = '      ' + rootLettersLabel + ' - ' + conjugationHeader.pastTenseRoot + ' '
        + conjugationHeader.presentTenseRoot + '     ';
      this._titles.push(new ArabicLabel(ac.id, label, ac.id));
    });
    this._selectedAbbreviatedConjugation = this.abbreviatedConjugations[0];
  }

}
