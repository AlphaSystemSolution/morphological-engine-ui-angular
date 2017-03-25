import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule,
  InputTextModule,
  InputSwitchModule,
  OverlayPanelModule,
  PanelModule,
  TemplateWrapper,
  ToggleButtonModule
} from 'primeng/primeng';
import { ApplicationControllerService } from './application-controller.service';
import { ArabicButtonComponent } from './arabic-button/arabic-button.component';
import { ArabicKeyboardComponent } from './arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from './arabic-dropdown/arabic-dropdown.component';
import { MorphologicalInputFormComponent } from './morphological-input-form/morphological-input-form.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    OverlayPanelModule,
    PanelModule,
    ToggleButtonModule
  ],
  exports: [
    ArabicButtonComponent,
    ArabicKeyboardComponent,
    ArabicDropdownComponent,
    TemplateWrapper,
    MorphologicalInputFormComponent],
  declarations: [
    ArabicButtonComponent,
    ArabicKeyboardComponent,
    ArabicDropdownComponent,
    MorphologicalInputFormComponent],
  providers: [ApplicationControllerService]
})
export class SharedModule { }
