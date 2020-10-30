import { Component, ElementRef, EventEmitter, Input, OnInit, AfterViewInit, Output, ViewChild } from '@angular/core';
import { Project } from '../../../model/project';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, AfterViewInit {

  @ViewChild('projectName') projectNameInput: ElementRef;
  @Input() visible: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  project: Project;
  private _inactive = true;

  constructor() { }

  ngOnInit() {
    this.project = new Project();
  }

  ngAfterViewInit(): void {
    fromEvent(this.projectNameInput.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value), // extract the value of the input
        filter((text: string, _) => {
          this.inactive = text.length <= 1;
          return !this.inactive;
        }),  // filter out if empty
        debounceTime(250) // only once every 2500ms
      )
      .subscribe((text: string) => this.project.fileName = text.replace(/ /g, '_').toLocaleLowerCase() + '.json',
        (err) => console.log('------------ ' + JSON.stringify(err)));
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
