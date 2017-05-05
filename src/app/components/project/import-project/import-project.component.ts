import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.css']
})
export class ImportProjectComponent implements OnInit {

  @Input() visible: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  private file: File;

  constructor() { }

  ngOnInit() { }

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
      input.value = this.file.name;
    }
  }

  submit(event, action) {
    this.visible = false;
    let result: File = null;
    if ('submit' === action) {
      result = this.file;
    }
    this.file = null;
    this.onClose.emit({ originalEvent: event, file: result });
  }

}
