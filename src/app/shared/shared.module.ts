import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';
//import { TemplateWrapper } from 'primeng/';
import { ArabicButtonComponent } from './arabic-button/arabic-button.component';
import { ArabicKeyboardComponent } from './arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from './arabic-dropdown/arabic-dropdown.component';
import { VerbalNounPickerComponent } from './verbal-noun-picker/verbal-noun-picker.component';
import { ToggleSelectorComponent } from './toggle-selector/toggle-selector.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    OverlayPanelModule,
    PanelModule,
    ToggleButtonModule
  ],
  exports: [
    ArabicButtonComponent,
    ArabicKeyboardComponent,
    ArabicDropdownComponent,
    //TemplateWrapper,
    VerbalNounPickerComponent,
    ToggleSelectorComponent
  ],
  declarations: [
    ArabicButtonComponent,
    ArabicKeyboardComponent,
    ArabicDropdownComponent,
    VerbalNounPickerComponent,
    ToggleSelectorComponent]
})
export class SharedModule { }
