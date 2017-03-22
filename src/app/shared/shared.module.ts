import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule, ButtonModule } from 'primeng/primeng';
import { ArabicButtonComponent } from './arabic-button/arabic-button.component';
import { ArabicKeyboardComponent } from './arabic-keyboard/arabic-keyboard.component';

@NgModule({
  imports: [
    CommonModule, ButtonModule, OverlayPanelModule
  ],
  exports: [ArabicButtonComponent, ArabicKeyboardComponent],
  declarations: [ArabicButtonComponent, ArabicKeyboardComponent]
})
export class SharedModule { }
