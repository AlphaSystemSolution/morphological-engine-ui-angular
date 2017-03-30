import { Component, Input, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { OverlayPanel } from 'primeng/primeng';
import {
  NamedTemplate, VerbalNoun, defaultNamedTemplate, verbalNouns,
  formIITemplates, formIIITemplates, formIVTemplates, formVTemplates,
  formVITemplates, formVIITemplates, formVIIITemplates, formIXTemplates, formXTemplates
} from '../model';
import { ToggleSelectorComponent } from '../toggle-selector/toggle-selector.component';

@Component({
  selector: 'app-verbal-noun-picker',
  templateUrl: './verbal-noun-picker.component.html',
  styleUrls: ['./verbal-noun-picker.component.css']
})
export class VerbalNounPickerComponent implements OnInit {

  @ViewChild('verbalNounPicker') verbalNounPicker: OverlayPanel;
  @ViewChildren(ToggleSelectorComponent) buttons: QueryList<ToggleSelectorComponent>;
  private _form: NamedTemplate;
  avaialbleValues: VerbalNoun[][] = [
    [verbalNouns[0], verbalNouns[1], verbalNouns[3], verbalNouns[4], verbalNouns[5]],
    [verbalNouns[6], verbalNouns[7], verbalNouns[8], verbalNouns[9], verbalNouns[10]],
    [verbalNouns[11], verbalNouns[12], verbalNouns[13], verbalNouns[14], verbalNouns[26]],
    [verbalNouns[27], verbalNouns[28], verbalNouns[30], verbalNouns[31]],
    [verbalNouns[33], verbalNouns[34], verbalNouns[35], verbalNouns[36]],
    [verbalNouns[37], verbalNouns[38], verbalNouns[39]]
  ];

  constructor() { }

  ngOnInit() {
  }

  @Input() get form(): NamedTemplate {
    if (!this._form) {
      this.form = defaultNamedTemplate;
    }
    return this._form;
  }

  set form(form: NamedTemplate) {
    this._form = (form === null) ? defaultNamedTemplate : form;
    this.handleFormChanged();
  }

  /**
   * Called from morphological input form to bring overlay up.
   *
   * @param {any} event
   *
   * @memberOf VerbalNounPickerComponent
   */
  show(event): void {
    this.verbalNounPicker.show(event);
  }

  /**
   * Called before showing the panel, this method will resets the avalialable templates with the currently selected template.
   *
   * @param {any} event
   *
   * @memberOf VerbalNounPickerComponent
   */
  reset(event) {

  }

  handleHide(event) {

  }

  handleSelectVerbalNoun(event) {
    console.log('>>>>>>>>>>>>>>> ' + JSON.stringify(event));
  }

  private handleFormChanged() {
    this.buttons.forEach(button => button.select = false);
    let defaultValues: VerbalNoun[][];
    const code = this.form.code;
    switch (code) {
      case 'Family II':
        defaultValues = formIITemplates;
        break;
      case 'Family III':
        defaultValues = formIIITemplates;
        break;
      case 'Family IV':
        defaultValues = formIVTemplates;
        break;
      case 'Family V':
        defaultValues = formVTemplates;
        break;
      case 'Family IV':
        defaultValues = formIVTemplates;
        break;
      case 'Family VI':
        defaultValues = formVITemplates;
        break;
      case 'Family VII':
        defaultValues = formVITemplates;
        break;
      case 'Family VIII':
        defaultValues = formVITemplates;
        break;
      case 'Family IX':
        defaultValues = formIXTemplates;
        break;
      case 'Family X':
        defaultValues = formXTemplates;
        break;
      default:
        break;
    }

    if (defaultValues) {
      this.buttons.forEach(button => {
        defaultValues.forEach(values => {
          values.forEach(value => {
            if (button.value.name === value.name) {
              button.select = true;
            }
          });
        });
      });
    }
  }

}
