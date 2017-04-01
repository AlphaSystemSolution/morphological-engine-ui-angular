import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationControllerService } from '../../application-controller.service';
import { MorphologicalInputFormComponent } from '../morphological-input-form/morphological-input-form.component';
import { MorphologicalInputFormModel } from '../../shared/morphological-input-form-model';
import { ConjugationConfiguration, MorphologicalInput } from '../../shared/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MorphologicalInputFormComponent) form: MorphologicalInputFormComponent;
  displayDialog: boolean;
  newRow: boolean;
  selectedRow: MorphologicalInput;
  data: MorphologicalInput[] = [];
  selectedRows: MorphologicalInput[] = [];

  constructor(public applicationController: ApplicationControllerService) {
    this.data[0] = MorphologicalInputFormModel.createDefaultValue();
  }

  ngOnInit() {
  }

  /**
   * Hide dialog.
   *
   * @param {any} event
   *
   * @memberOf HomeComponent
   */
  hnadleHide(event) {
    const result: MorphologicalInput = event.result;
    if (result) {
      this.save(result);
    }
    this.displayDialog = false;
  }

  performAction(action) {
    console.log(JSON.stringify(action));
    switch (action) {
      case 'ADD':
        this.displayDialog = true;
        this.newRow = true;
        break;
      case 'EDIT':
        this.form.model.mInput = this.selectedRow;
        this.newRow = false;
        this.displayDialog = true;
        break;
    }
  }

  selectRow(event) {
    this.selectedRow = MorphologicalInputFormModel.cloneMorphologicalInput(event.data);
  }

  private save(result: MorphologicalInput) {
    if (this.newRow) {
      this.data.push(result);
      this.newRow = false;
    } else {
      this.data[this.findSelectedRowIndex()] = this.selectedRow;
    }
  }

  private findSelectedRowIndex(): number {
    let index = -1;
    this.data.filter((o, i) => {
      if (o.id === this.selectedRow.id) {
        index = i;
      }
    });
    return index;
  }

}
