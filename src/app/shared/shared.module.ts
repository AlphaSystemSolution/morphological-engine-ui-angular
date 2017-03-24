import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, OverlayPanelModule, TemplateWrapper, ToggleButtonModule } from 'primeng/primeng';
import { ArabicButtonComponent } from './arabic-button/arabic-button.component';
import { ArabicKeyboardComponent } from './arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from './arabic-dropdown/arabic-dropdown.component';

@NgModule({
  imports: [
    CommonModule, ButtonModule, OverlayPanelModule, ToggleButtonModule
  ],
  exports: [ArabicButtonComponent, ArabicKeyboardComponent, ArabicDropdownComponent, TemplateWrapper],
  declarations: [ArabicButtonComponent, ArabicKeyboardComponent, ArabicDropdownComponent, TemplateWrapper]
})
export class SharedModule { }
