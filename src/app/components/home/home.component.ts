import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { ApplicationControllerService } from '../../application-controller.service';
import { MorphologicalInputFormComponent } from '../morphological-input-form/morphological-input-form.component';
import { MorphologicalInputFormModel } from '../../shared/morphological-input-form-model';
import { MorphologicalChartComponent } from '../morphological-chart/morphological-chart.component';
import { ConjugationConfiguration } from '../../model/common';
import { MorphologicalInput } from '../../model/morphological-input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MorphologicalInputFormComponent) form: MorphologicalInputFormComponent;
  @ViewChild(MorphologicalChartComponent) chart: MorphologicalChartComponent;
  displayDialog: boolean;
  newRow: boolean;
  importDialog: boolean;
  exportDialog: boolean;
  selectedRow: MorphologicalInput;
  selectedRows: MorphologicalInput[] = [];

  constructor(public applicationController: ApplicationControllerService, private confirmationService: ConfirmationService) { }

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
    this.clearSelectedRows();
  }

  performAction(action) {
    switch (action) {
      case 'IMPORT':
        this.import();
        break;
      case 'EXPORT':
        this.export();
        break;
      case 'ADD':
        this.doAdd();
        break;
      case 'EDIT':
        this.doEdit();
        break;
      case 'DUPLICATE':
        this.doDuplicate();
        break;
      case 'REMOVE':
        this.doRemove();
        break;
      case 'DICTIONARY':
        this.viewDictionary();
        break;
      default:
        console.log(action);
        break;
    }
  }

  selectRow(event) {
    this.selectedRow = event.data;
  }

  importFile(event) {
    const file: File = event.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // this 'text' is the content of the file
        const text = reader.result;
        this.applicationController.importFile(text);
        this.importDialog = false;
      };
      reader.onerror = () => {
        this.importDialog = false;
      };
      reader.readAsText(file);
    } else {
      this.importDialog = false;
    }
  }

  exportFile(event) {
    this.exportDialog = false;
    const fileName: string = event.file;
    if (fileName) {
      this.applicationController.exportFile(fileName);
    }
  }

  handleChange(event) {
    const index: number = event.index;
    if (index === 1) {
      this.chart.abbreviatedConjugations = this.applicationController.abbreviatedConjugations;
    }
  }

  private import() {
    this.importDialog = true;
  }

  private export() {
    this.exportDialog = true;
  }

  private save(result: MorphologicalInput) {
    let index = -1;
    let data: MorphologicalInput = null;
    if (this.newRow) {
      data = result;
      this.newRow = false;
    } else {
      index = this.applicationController.findInputRowIndex(this.selectedRow);
      data = this.selectedRow;
    }
    this.applicationController.addData(data, index);
  }

  private doAdd() {
    this.displayDialog = true;
    this.newRow = true;
  }

  private doEdit() {
    if (!this.selectedRow) {
      return;
    }
    this.selectedRow = MorphologicalInput.copy(this.selectedRow, true);
    this.form.model.mInput = this.selectedRow;
    this.newRow = false;
    this.displayDialog = true;
  }

  private doDuplicate() {
    if (!this.selectedRow) {
      return;
    }
    this.displayDialog = true;
    this.newRow = true;
    this.form.model.mInput = MorphologicalInput.copy(this.selectedRow, false);
  }

  private doRemove() {
    if (!this.selectedRow) {
      return;
    }
    this.confirmationService.confirm({
      message: 'Do you want to remove this record?',
      header: 'Remove Confirmation',
      icon: 'fa fa-times',
      accept: () => {
        this.applicationController.removeData(this.applicationController.findInputRowIndex(this.selectedRow));
        this.clearSelectedRows();
      },
      reject: () => this.clearSelectedRows()
    });
  }

  private viewDictionary() {
    if (!this.selectedRow) {
      return;
    }
    this.applicationController.openWithRootLetters(this.selectedRow.rootLetters);
    this.clearSelectedRows();
  }

  private clearSelectedRows() {
    this.selectedRows = [];
    this.selectedRow = null;
  }

}
