import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { OverlayPanel } from 'primeng/primeng';

import { ArabicButtonComponent } from '../arabic-button/arabic-button.component';
import { ArabicLetter, arabicLetters } from '../model';

@Component({
  selector: 'app-arabic-keyboard',
  templateUrl: './arabic-keyboard.component.html',
  styleUrls: ['./arabic-keyboard.component.css']
})
export class ArabicKeyboardComponent implements OnInit {

  @ViewChild('rootLettersPicker') rootLettersPicker: OverlayPanel;

  constructor() { }

  ngOnInit() {
  }

  @Input() get letters(): ArabicLetter[] {
    return arabicLetters;
  }

  show(event): void {
    this.rootLettersPicker.show(event);
  }

}
