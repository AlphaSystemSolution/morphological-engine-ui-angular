import { Component, OnInit } from '@angular/core';
import { ApplicationControllerService } from '../application-controller.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-morphological-chart',
  templateUrl: './morphological-chart.component.html',
  styleUrls: ['./morphological-chart.component.css']
})
export class MorphologicalChartComponent implements OnInit {

  private morphologicalCharts: Observable<any>;

  constructor(private applicationController: ApplicationControllerService) {
    this.morphologicalCharts = this.applicationController.morphologicalCharts;
  }

  ngOnInit() {
  }

}
