import { Component, OnInit, Input } from '@angular/core';

import { ArabicLabel } from '../model';

@Component({
  selector: 'app-arabic-button',
  templateUrl: './arabic-button.component.html',
  styleUrls: ['./arabic-button.component.css']
})
export class ArabicButtonComponent implements OnInit {

  private _label: string;

  private _letter: ArabicLabel;

  constructor() { }

  ngOnInit() {
  }

  get letter(): ArabicLabel {
    return this._letter;
  }

  get label(): string {
    return this._label;
  }

  set letter(letter: ArabicLabel) {
    this._letter = letter;
    if (this._letter) {
      this._label = letter.label;
    }
  }

}
