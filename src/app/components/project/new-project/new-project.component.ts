import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Project } from '../../../model/project';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  @ViewChild('projectName') projectNameInput: ElementRef;
  @Input() visible: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  project: Project;
  private _inactive = true;

  constructor() { }

  ngOnInit() {
    this.project = new Project();
    Observable.fromEvent(this.projectNameInput.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // extract the value of the input
      .filter((text: string) => {
        this.inactive = text.length <= 1;
        return !this.inactive;
      }) // filter out if empty
      .debounceTime(500) // only once every 500ms
      .subscribe(
      (text: string) => this.project.fileName = text.replace(/ /g, '_').toLocaleLowerCase() + '.json',
      (err) => {
        console.log('------------ ' + JSON.stringify(err));
      }
      );
  }

  get inactive(): boolean {
    return this._inactive;
  }

  set inactive(value: boolean) {
    this._inactive = value;
    if (this.inactive) {
      this.project.fileName = '';
    }
  }

  submit(event, action: string) {
    this.visible = false;
    if ('submit' === action) {
      this.onClose.emit({ originalEvent: event, result: this.project });
    } else {
      this.onClose.emit({ originalEvent: event, result: undefined });
    }
    this.project = new Project();
  }

}
