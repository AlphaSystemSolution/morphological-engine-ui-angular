import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  @Input() exportFileName: string;
  @Input() visible: boolean;
  @Input() mode = 'import';
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  header = 'Import';
  private file: File;

  constructor() { }

  ngOnInit() {
    this.header = this.mode === 'import' ? 'Import' : 'Export';
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
      input.value = this.file.name;
    }
  }

  hideDialog(event, action) {
    this.visible = false;
    if (this.mode === 'import') {
      let result: File = null;
      if ('submit' === action) {
        result = this.file;
      }
      this.file = null;
      this.onClose.emit({ originalEvent: event, file: result });
    } else {
      let result: string = null;
      if ('submit' === action) {
        result = this.input.nativeElement.value;
        const extensionIndex = result.lastIndexOf('.');
        let addExtension = extensionIndex < 0;
        if (!addExtension) {
          const extension = result.substring(extensionIndex + 1);
          addExtension = 'json' !== extension;
        }
        if (addExtension) {
          result += '.json';
        }
      }
      this.onClose.emit({ originalEvent: event, file: result });
    }
  }

}
