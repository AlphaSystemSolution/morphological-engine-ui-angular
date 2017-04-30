import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  fileItems: MenuItem[];
  @Output() onAction: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.fileItems = [
      // { label: 'New', icon: 'fa-file', command: () => this.handleButtonClick('NEW') },
      { label: 'Import', icon: 'fa-download', command: () => this.handleButtonClick('IMPORT') },
      { label: 'Export', icon: 'fa-upload', command: () => this.handleButtonClick('EXPORT') }
    ];
  }

  handleButtonClick(action: string) {
    this.onAction.emit(action);
  }

}
