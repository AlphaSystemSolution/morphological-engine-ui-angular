import { Component, OnInit, ViewChild, ViewChildren, Input, Output, EventEmitter, QueryList } from '@angular/core';

import { OverlayPanel } from 'primeng/primeng';

import { ToggleSelectorComponent } from '../toggle-selector/toggle-selector.component';
import { ArabicLetter } from '../../model/arabic-letter';
import { RootLetters } from '../../model/root-letters';

@Component({
  selector: 'app-arabic-keyboard',
  templateUrl: './arabic-keyboard.component.html',
  styleUrls: ['./arabic-keyboard.component.css']
})
export class ArabicKeyboardComponent implements OnInit {

  @ViewChild('rootLettersPicker') rootLettersPicker: OverlayPanel;
  @ViewChildren(ToggleSelectorComponent) buttons: QueryList<ToggleSelectorComponent>;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  private _rootLetters: RootLetters;
  private currentIndex: number;

  constructor() { }

  ngOnInit() {
    this.resetSelection();
  }

  get letters(): ArabicLetter[] {
    return ArabicLetter.arabicLetters;
  }

  show(event): void {
    this.rootLettersPicker.show(event);
  }

  @Input() get rootLetters(): RootLetters {
    return this._rootLetters;
  }

  set rootLetters(value: RootLetters) {
    this._rootLetters = value;
  }

  selectLetter(letter: ArabicLetter): void {
    switch (this.currentIndex) {
      case 0:
        this.rootLetters.firstRadical = letter;
        break;
      case 1:
        this.rootLetters.secondRadical = letter;
        break;
      case 2:
        this.rootLetters.thirdRadical = letter;
        break;
      case 3:
        this.rootLetters.firstRadical = letter;
        break;
    }
    // update currentIndex
    this.currentIndex = (this.currentIndex + 1) % 4;
    this.updateState(this.currentIndex, true);
  }

  resetSelection(): void {
    this.currentIndex = 0;
    this.rootLetters = new RootLetters(this.letters[19], this.letters[17], this.letters[22], this.letters[28]);
  }

  handleSelect(event, index: number) {
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

  handleShow(event) {
    this.currentIndex = 0;
    this.updateState(this.currentIndex, true);
  }

  private handleHide(event): void {
    this.onClose.emit({ 'rootLetters': this.rootLetters });
  }

  private updateState(index: number, state: boolean) {
    this.buttons.forEach((button, i) => button.select = (i === index));
  }

}
