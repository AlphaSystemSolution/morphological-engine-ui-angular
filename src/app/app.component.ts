import { Component, OnInit } from '@angular/core';
import { MorphologicalInputFormComponent } from './shared/morphological-input-form/morphological-input-form.component';
import { MorphologicalInput, namedTemplates, defaultMorphologicalInput } from './shared/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  morphologicalInput: MorphologicalInput;

  constructor() {
    this.morphologicalInput = defaultMorphologicalInput;
  }

  ngOnInit() {
  }

}
