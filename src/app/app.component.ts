import { Component, OnInit, ViewChild } from '@angular/core';

import { ArabicKeyboardComponent } from './shared/arabic-keyboard/arabic-keyboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Morphological Engine!';

  ngOnInit() {
  }

}
