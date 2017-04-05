import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  importDialog: boolean;
  selectedRow: MorphologicalInput;
  selectedRows: MorphologicalInput[] = [];

  constructor(private applicationController: ApplicationControllerService, private confirmationService: ConfirmationService,
    private router: Router) {
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
    this.clearSelectedRows();
  }

  performAction(action) {
    switch (action) {
      case 'IMPORT':
        this.import();
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
      case 'CONJUGATION':
        this.viewConjugations();
        break;
      default:
        console.log(action);
        break;
    }
  }

  selectRow(event) {
    this.selectedRow = event.data;
  }

  loadFile(event) {
    const file: File = event.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // this 'text' is the content of the file
        const text = reader.result;
        console.log('>>>>>>>> ' + text);
      };
      reader.readAsText(file);
    }
  }

  private import() {
    this.importDialog = true;
  }

  private export() {
    // TODO:
  }

  private save(result: MorphologicalInput) {
    if (this.newRow) {
      this.applicationController.data.push(result);
      this.newRow = false;
    } else {
      this.applicationController.data[this.findSelectedRowIndex()] = this.selectedRow;
    }
  }

  private findSelectedRowIndex(): number {
    let index = -1;
    this.applicationController.data.filter((o, i) => {
      if (o.id === this.selectedRow.id) {
        index = i;
      }
    });
    return index;
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
        this.applicationController.data.splice(this.findSelectedRowIndex(), 1);
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

  private viewConjugations() {
    if (!this.selectedRows) {
      return;
    }
    this.applicationController.getMorphologicalChart(this.selectedRows);
    this.router.navigate(['staging']).then(() => {
      this.router.navigate(['home']);
    });
    this.clearSelectedRows();
  }

  private clearSelectedRows() {
    this.selectedRows = [];
    this.selectedRow = null;
  }

}
