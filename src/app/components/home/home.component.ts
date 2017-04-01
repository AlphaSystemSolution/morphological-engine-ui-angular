import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
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

  constructor(private applicationController: ApplicationControllerService, private confirmationService: ConfirmationService) {
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
    this.selectedRows = [];
    this.selectedRow = null;
  }

  performAction(action) {
    console.log(JSON.stringify(action));
    switch (action) {
      case 'ADD':
        this.displayDialog = true;
        this.newRow = true;
        break;
      case 'EDIT':
        if (!this.selectedRow) {
          break;
        }
        this.selectedRow = MorphologicalInputFormModel.cloneMorphologicalInput(this.selectedRow);
        this.form.model.mInput = this.selectedRow;
        this.newRow = false;
        this.displayDialog = true;
        break;
      case 'DUPLICATE':
        if (!this.selectedRow) {
          break;
        }
        this.displayDialog = true;
        this.newRow = true;
        this.form.model.mInput = this.selectedRow;
        break;
      case 'REMOVE':
        if (!this.selectedRow) {
          break;
        }
        this.confirmationService.confirm({
          message: 'Do you want to remove this record?',
          header: 'Remove Confirmation',
          icon: 'fa fa-times',
          accept: () => {
            this.data.splice(this.findSelectedRowIndex(), 1);
            this.selectedRows = [];
            this.selectedRow = null;
          },
          reject: () => {
            this.selectedRows = [];
            this.selectedRow = null;
          }
        });
        break;
    }
  }

  selectRow(event) {
    this.selectedRow = event.data;
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
