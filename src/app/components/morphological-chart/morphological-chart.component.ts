import { Component, OnInit } from '@angular/core';
import { ApplicationControllerService } from '../../application-controller.service';
import { Observable } from 'rxjs/Observable';
import { MorphologicalChart, AbbreviatedConjugation } from '../model';

@Component({
  selector: 'app-morphological-chart',
  templateUrl: './morphological-chart.component.html',
  styleUrls: ['./morphological-chart.component.css']
})
export class MorphologicalChartComponent implements OnInit {

  private morphologicalCharts: Observable<MorphologicalChart[]>;
  private _abbreviatedConjugations: AbbreviatedConjugation[];

  constructor(private applicationController: ApplicationControllerService) {
    this.morphologicalCharts = this.applicationController.morphologicalCharts;
  }

  get abbreviatedConjugations(): AbbreviatedConjugation[] {
    return this._abbreviatedConjugations;
  }

  set abbreviatedConjugations(value: AbbreviatedConjugation[]) {
    this._abbreviatedConjugations = value;
  }

  ngOnInit() {
  }

}
