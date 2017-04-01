import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  @Output() onAction: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleButtonClick(action: string) {
    this.onAction.emit(action);
  }

}
