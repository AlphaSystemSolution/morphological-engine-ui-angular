import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ArabicLabel } from '../../model/common';
import { ToggleButton } from 'primeng/primeng';
@Component({
  selector: 'app-toggle-selector',
  templateUrl: './toggle-selector.component.html',
  styleUrls: ['./toggle-selector.component.css']
})
export class ToggleSelectorComponent implements OnInit {

  @ViewChild(ToggleButton) toggle: ToggleButton;
  @Input() value: ArabicLabel;
  @Input() styleClass: string;
  private _select = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get checked(): boolean {
    return this.toggle.checked;
  }

  @Input() get select(): boolean {
    return this._select;
  }

  set select(value: boolean) {
    this._select = value;
    this.toggle.checked = this.select;
  }

  handleOnChange(event) {
    this.onChange.emit({'checked': event.checked, 'value': this.value});
  }

}
