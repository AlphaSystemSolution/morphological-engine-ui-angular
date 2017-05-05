import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-export-project',
  templateUrl: './export-project.component.html',
  styleUrls: ['./export-project.component.css']
})
export class ExportProjectComponent implements OnInit {

  private _exportFileName: string;
  @Input() visible: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  inactive = true;

  private static hasInValidLength(src: string): boolean {
    let result = src;
    const extensionIndex = result.lastIndexOf('.');
    if (extensionIndex >= 0) {
      result = result.substring(0, extensionIndex);
    }
    return result.length < 4;
  }

  constructor() { }

  ngOnInit() { }

  @Input() get exportFileName(): string {
    return this._exportFileName;
  }

  set exportFileName(value: string) {
    this._exportFileName = value;
    this.inactive = ExportProjectComponent.hasInValidLength(this.exportFileName);
  }

  submit(event, action: string) {
    this.visible = false;
    let result: string = null;
    if ('submit' === action) {
      result = this.exportFileName;
      const extensionIndex = result.lastIndexOf('.');
      if (extensionIndex >= 0) {
        result = result.substring(0, extensionIndex);
      }
      result += '.json';
      console.log(result);
    }
    this.onClose.emit({ originalEvent: event, file: result });
  }

}
