import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { OverlayPanel } from 'primeng/primeng';

import { ArabicButtonComponent } from '../arabic-button/arabic-button.component';
import { ArabicLetter } from '../model';

@Component({
  selector: 'app-arabic-keyboard',
  templateUrl: './arabic-keyboard.component.html',
  styleUrls: ['./arabic-keyboard.component.css']
})
export class ArabicKeyboardComponent implements OnInit, AfterViewInit {

  @ViewChild('rootLettersPicker') rootLettersPicker: OverlayPanel;

  // row1
  @ViewChild('DDAD') button_DDAD: ArabicButtonComponent;
  @ViewChild('SAD') button_SAD: ArabicButtonComponent;
  @ViewChild('THA') button_THA: ArabicButtonComponent;
  @ViewChild('QAF') button_QAF: ArabicButtonComponent;
  @ViewChild('FA') button_FA: ArabicButtonComponent;
  @ViewChild('GHAIN') button_GHAIN: ArabicButtonComponent;
  @ViewChild('AIN') button_AIN: ArabicButtonComponent;
  @ViewChild('HHA') button_HHA: ArabicButtonComponent;
  @ViewChild('KHA') button_KHA: ArabicButtonComponent;
  @ViewChild('HA') button_HA: ArabicButtonComponent;
  @ViewChild('JEEM') button_JEEM: ArabicButtonComponent;
  @ViewChild('DAL') button_DAL: ArabicButtonComponent;
  @ViewChild('THAL') button_THAL: ArabicButtonComponent;

  // row2
  @ViewChild('SHEEN') button_SHEEN: ArabicButtonComponent;
  @ViewChild('SEEN') button_SEEN: ArabicButtonComponent;
  @ViewChild('YA') button_YA: ArabicButtonComponent;
  @ViewChild('BA') button_BA: ArabicButtonComponent;
  @ViewChild('LAM') button_LAM: ArabicButtonComponent;
  @ViewChild('TA') button_TA: ArabicButtonComponent;
  @ViewChild('NOON') button_NOON: ArabicButtonComponent;
  @ViewChild('MEEM') button_MEEM: ArabicButtonComponent;
  @ViewChild('KAF') button_KAF: ArabicButtonComponent;
  @ViewChild('TTA') button_TTA: ArabicButtonComponent;

  // row3
  @ViewChild('HAMZA') button_HAMZA: ArabicButtonComponent;
  @ViewChild('RA') button_RA: ArabicButtonComponent;
  @ViewChild('WAW') button_WAW: ArabicButtonComponent;
  @ViewChild('ZAIN') button_ZAIN: ArabicButtonComponent;
  @ViewChild('DTHA') button_DTHA: ArabicButtonComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initRow1();
    this.initRow2();
    this.initRow3();
  }

  private initRow1() {
    this.button_DDAD.letter = new ArabicLetter('DDAD', 'ض', 'D');
    this.button_SAD.letter = new ArabicLetter('SAD', 'ص', 'S');
    this.button_THA.letter = new ArabicLetter('THA', 'ث', 'v');
    this.button_QAF.letter = new ArabicLetter('QAF', 'ق', 'q');
    this.button_FA.letter = new ArabicLetter('FA', 'ف', 'f');
    this.button_GHAIN.letter = new ArabicLetter('GHAIN', 'غ', 'g');
    this.button_AIN.letter = new ArabicLetter('AIN', 'ع', 'E');
    this.button_HHA.letter = new ArabicLetter('HHA', 'ح', 'H');
    this.button_KHA.letter = new ArabicLetter('KHA', 'خ', 'x');
    this.button_HA.letter = new ArabicLetter('HA', 'ه', 'h');
    this.button_JEEM.letter = new ArabicLetter('JEEM', 'ج', 'j');
    this.button_DAL.letter = new ArabicLetter('DAL', 'د', 'd');
    this.button_THAL.letter = new ArabicLetter('THAL', 'ذ', '*');
  }

  private initRow2() {
    this.button_SHEEN.letter = new ArabicLetter('SHEEN', 'ش', '$');
    this.button_SEEN.letter = new ArabicLetter('SEEN', 'س', 's');
    this.button_YA.letter = new ArabicLetter('YA', 'ي', 'y');
    this.button_BA.letter = new ArabicLetter('BA', 'ب', 'b');
    this.button_LAM.letter = new ArabicLetter('LAM', 'ل', 'l');
    this.button_TA.letter = new ArabicLetter('TA', 'ت', 't');
    this.button_NOON.letter = new ArabicLetter('NOON', 'ن', 'n');
    this.button_MEEM.letter = new ArabicLetter('MEEM', 'م', 'm');
    this.button_KAF.letter = new ArabicLetter('KAF', 'ك', 'k');
    this.button_TTA.letter = new ArabicLetter('TTA', 'ط', 'T');
  }

  private initRow3() {
    this.button_HAMZA.letter = new ArabicLetter('HAMZA', 'ء', '\'');
    this.button_RA.letter = new ArabicLetter('RA', 'ر', 'r');
    this.button_WAW.letter = new ArabicLetter('WAW', 'و', 'w');
    this.button_ZAIN.letter = new ArabicLetter('ZAIN', 'ز', 'z');
    this.button_DTHA.letter = new ArabicLetter('DTHA', 'ظ', 'Z');
  }

  show(event): void {
    this.rootLettersPicker.show(event);
  }

}
