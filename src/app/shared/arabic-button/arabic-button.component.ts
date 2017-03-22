import { Component, OnInit, Input } from '@angular/core';

import { ArabicLabel } from '../model';

@Component({
  selector: 'app-arabic-button',
  templateUrl: './arabic-button.component.html',
  styleUrls: ['./arabic-button.component.css']
})
export class ArabicButtonComponent implements OnInit {

  private _letter: ArabicLabel;

  constructor() { }

  ngOnInit() {
  }

  @Input() get letter(): ArabicLabel {
    return this._letter;
  }

  set letter(letter: ArabicLabel) {
    this._letter = letter;
  }

}
