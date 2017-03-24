import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { OverlayPanel, ToggleButton } from 'primeng/primeng';

import { ArabicButtonComponent } from '../arabic-button/arabic-button.component';
import { ArabicLetter, RootLetters, arabicLetters } from '../model';

@Component({
  selector: 'app-arabic-keyboard',
  templateUrl: './arabic-keyboard.component.html',
  styleUrls: ['./arabic-keyboard.component.css']
})
export class ArabicKeyboardComponent implements OnInit, AfterViewInit {

  @ViewChild('rootLettersPicker') rootLettersPicker: OverlayPanel;
  @ViewChild('label1') label1: ToggleButton;
  @ViewChild('label2') label2: ToggleButton;
  @ViewChild('label3') label3: ToggleButton;
  @ViewChild('label4') label4: ToggleButton;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  private _selectedLetters: ArabicLetter[];
  private currentIndex: number;

  constructor() { }

  ngOnInit() {
    this._selectedLetters = [];
    this.resetSelection();
  }

  ngAfterViewInit(): void {
    this.updateState(this.currentIndex, true);
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
    this.updateState(this.currentIndex, true);
  }

  resetSelection(): void {
    this.currentIndex = 0;
    this._selectedLetters[0] = this.letters[19];
    this._selectedLetters[1] = this.letters[17];
    this._selectedLetters[2] = this.letters[22];
    this._selectedLetters[3] = this.letters[28];
  }

  handleSelect(event, index: number): void {
    const checked: boolean = event.checked;
    if (checked) {
      this.updateState(this.currentIndex, false);
      this.currentIndex = index;
    } else {
      const nextIndex = (this.currentIndex + 1) % 4;
      this.updateState(nextIndex, true);
      this.currentIndex = nextIndex;
    }
    this.updateState(index, checked);
  }

  private handleHide(event): void {
    const result = new RootLetters(this._selectedLetters[0], this._selectedLetters[1], this._selectedLetters[2], this._selectedLetters[3]);
    this.onClose.emit({ 'rootLetters': result });
  }

  private hnadleShow(event) {
    this.currentIndex = 0;
    this.updateState(this.currentIndex, true);
  }

  private updateState(index: number, state: boolean) {
    switch (index) {
      case 0:
        this.label1.checked = state;
        this.label2.checked = false;
        this.label3.checked = false;
        this.label4.checked = false;
        break;
      case 1:
        this.label1.checked = false;
        this.label2.checked = state;
        this.label3.checked = false;
        this.label4.checked = false;
        break;
      case 2:
        this.label1.checked = false;
        this.label2.checked = false;
        this.label3.checked = state;
        this.label4.checked = false;
        break;
      case 3:
        this.label1.checked = false;
        this.label2.checked = false;
        this.label3.checked = false;
        this.label4.checked = state;
        break;
    }
  }

}
