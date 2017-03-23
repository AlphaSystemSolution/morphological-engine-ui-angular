import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { ArabicKeyboardComponent } from './shared/arabic-keyboard/arabic-keyboard.component';
import { ArabicLetter, arabicLetters } from './shared/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'Morphological Engine!';

  @ViewChild('result') result: ElementRef;
  @ViewChild('picker') picker: ArabicKeyboardComponent;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const ne: HTMLInputElement = this.result.nativeElement;
    ne.innerHTML = arabicLetters[19].label + arabicLetters[17].label + arabicLetters[22].label;
  }

  handleClose(event) {
    const result = event.selectedLetters;
    const firstRadical: ArabicLetter = <ArabicLetter>result.firstRadical;
    const secondRadical: ArabicLetter = <ArabicLetter>result.secondRadical;
    const thirdRadical: ArabicLetter = <ArabicLetter>result.thirdRadical;
    const ne: HTMLInputElement = this.result.nativeElement;
    ne.innerHTML = firstRadical.label + secondRadical.label + thirdRadical.label;
  }


}
