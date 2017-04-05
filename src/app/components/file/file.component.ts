import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input() importDialog: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  private file: File;

  constructor() { }

  ngOnInit() {
  }

  onChooseClick(event, fileInput) {
    this.file = null;
    fileInput.value = null;
    fileInput.click();
  }

  onFileSelect(event, input) {
    input.value = '';
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      console.log('FILE: ' + this.file.name);
      input.value = this.file.name;
    }
  }

  hideDialog(event, action) {
    this.importDialog = false;
    let result: File = null;
    if ('submit' === action) {
      result = this.file;
    }
    this.file = null;
    this.onClose.emit({ originalEvent: event, file: result });
  }

}
