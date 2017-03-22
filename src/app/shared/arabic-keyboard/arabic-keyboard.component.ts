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
  private _selectedLetters: ArabicLetter[];
  private currentIndex: number;

  constructor() { }

  ngOnInit() {
    this._selectedLetters = [];
    this.resetSelection();
  }

  get letters(): ArabicLetter[] {
    return arabicLetters;
  }

  get selectedLetters(): ArabicLetter[] {
    return this._selectedLetters;
  }

  show(event): void {
    this.rootLettersPicker.show(event);
  }

  selectLetter(letter: ArabicLetter): void {
    // update this letter @ currentIndex
    this._selectedLetters[this.currentIndex] = letter;
    // update currentIndex
    this.currentIndex = (this.currentIndex + 1) % 4;
  }

  resetSelection(): void {
    this.currentIndex = 0;
    this._selectedLetters[0] = this.letters[19];
    this._selectedLetters[1] = this.letters[17];
    this._selectedLetters[2] = this.letters[22];
    this._selectedLetters[3] = null;
  }

}
