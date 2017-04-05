import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  fileItems: MenuItem[];
  actionItems: MenuItem[];
  viewItems: MenuItem[];
  @Output() onAction: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.fileItems = [
      { label: 'Import', icon: 'fa-download', command: () => this.handleButtonClick('IMPORT') },
      { label: 'Export', icon: 'fa-upload', command: () => this.handleButtonClick('EXPORT') }
    ];
    this.actionItems = [
      { label: 'Add', icon: 'fa-plus-square', command: () => this.handleButtonClick('ADD') },
      { label: 'Edit', icon: 'fa-pencil-square', command: () => this.handleButtonClick('EDIT') },
      { label: 'Duplicate', icon: 'fa-clone', command: () => this.handleButtonClick('DUPLICATE') },
      { label: 'Remove', icon: 'fa-times', command: () => this.handleButtonClick('REMOVE') }
    ];
    this.viewItems = [
      { label: 'Conjugation(s)', command: () => this.handleButtonClick('CONJUGATION') },
      { label: 'Dictionary', command: () => this.handleButtonClick('DICTIONARY') }
    ];
  }

  handleButtonClick(action: string) {
    this.onAction.emit(action);
  }

}
