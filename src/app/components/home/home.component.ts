import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/primeng';
import { ApplicationControllerService } from '../../application-controller.service';
import { MorphologicalInputFormComponent } from '../morphological-input-form/morphological-input-form.component';
import { MorphologicalInputFormModel } from '../../shared/morphological-input-form-model';
import { MorphologicalChartComponent } from '../morphological-chart/morphological-chart.component';
import { ConjugationConfiguration } from '../../model/common';
import { MorphologicalInput } from '../../model/morphological-input';
import { RootLetters } from '../../model/root-letters';

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
  operations: MenuItem[] = [];
  private currentTabIndex = 0;

  constructor(public applicationController: ApplicationControllerService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.operations = [
      { label: 'Add', icon: 'fa-plus-square', command: () => this.doAdd() },
      { label: 'Edit', icon: 'fa-pencil-square', command: () => this.doEdit() },
      { label: 'Duplicate', icon: 'fa-clone', command: () => this.doDuplicate() },
      { label: 'Remove', icon: 'fa-times', command: () => this.doRemove() },
      { label: 'View Conjugation', command: () => this.viewConjugation() },
      { label: 'View Dictionary', command: () => this.viewDictionary() }
    ];
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
      case 'NEW':
        this.newFile();
        break;
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
    this.currentTabIndex = event.index;
    if (this.currentTabIndex === 1) {
      this.chart.abbreviatedConjugations = this.applicationController.abbreviatedConjugations;
    }
  }

  private newFile() {
    if (this.applicationController.data.length > 0) {
      /*this.confirmationService.confirm({
        message: 'Do you want to export your file?',
        header: 'New File Confirmation',
        icon: 'fa fa-upload',
        accept: () => {
          this.export();
          this.applicationController.removeData(this.applicationController.findInputRowIndex(this.selectedRow));
          this.clearSelectedRows();
        },
        reject: () => this.clearSelectedRows()
      });*/
    } else {

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
    this.selectedRow = MorphologicalInput.copy(this.selectedRows[0], true);
    this.form.model.mInput = this.selectedRow;
    this.newRow = false;
    this.displayDialog = true;
  }

  private doDuplicate() {
    this.displayDialog = true;
    this.newRow = true;
    this.form.model.mInput = MorphologicalInput.copy(this.selectedRows[0], false);
  }

  private doRemove() {
    this.confirmationService.confirm({
      message: 'Do you want to remove this record?',
      header: 'Remove Confirmation',
      icon: 'fa fa-times',
      accept: () => {
        this.applicationController.removeData(this.applicationController.findInputRowIndex(this.selectedRows[0]));
        this.clearSelectedRows();
      },
      reject: () => this.clearSelectedRows()
    });
  }

  private viewDictionary() {
    let rootLetters: RootLetters = null;
    // table tab and selectedRow exists
    if (this.currentTabIndex === 0) {
      rootLetters = this.selectedRows[0].rootLetters;
    } else if (this.currentTabIndex === 1) {
      // conjugation tab
      rootLetters = this.chart.selectedAbbreviatedConjugation.rootLetters;
    }
    if (!rootLetters) {
      return;
    }
    this.applicationController.openWithRootLetters(rootLetters);
    this.clearSelectedRows();
  }

  private viewConjugation() {
    const index = this.applicationController.findInputRowIndex(this.selectedRows[0]);
    if (index >= 0) {
      this.chart.viewConjugation(index);
    }
    this.clearSelectedRows();
  }

  private clearSelectedRows() {
    this.selectedRows = [];
    this.selectedRow = null;
  }

}
