import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { OverlayPanel } from 'primeng/primeng';
import {
  NamedTemplate, VerbalNoun, defaultNamedTemplate, verbalNounPatterns,
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
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private _form: NamedTemplate;
  avaialbleValues: VerbalNoun[][] = [
    [VerbalNoun.VERBAL_NOUN_V1, VerbalNoun.VERBAL_NOUN_V2, VerbalNoun.VERBAL_NOUN_V3, VerbalNoun.VERBAL_NOUN_V4, VerbalNoun.VERBAL_NOUN_V5],
    [VerbalNoun.VERBAL_NOUN_V6, VerbalNoun.VERBAL_NOUN_V7, VerbalNoun.VERBAL_NOUN_V8, VerbalNoun.VERBAL_NOUN_V9,
    VerbalNoun.VERBAL_NOUN_V10],
    [VerbalNoun.VERBAL_NOUN_V11, VerbalNoun.VERBAL_NOUN_V12, VerbalNoun.VERBAL_NOUN_V13, VerbalNoun.VERBAL_NOUN_V14,
    VerbalNoun.VERBAL_NOUN_V15],
    [VerbalNoun.VERBAL_NOUN_V27, VerbalNoun.VERBAL_NOUN_V28, VerbalNoun.VERBAL_NOUN_FORM_II, VerbalNoun.VERBAL_NOUN_FORM_III_V1,
    VerbalNoun.VERBAL_NOUN_FORM_III_V2],
    [VerbalNoun.VERBAL_NOUN_FORM_IV, VerbalNoun.VERBAL_NOUN_FORM_V, VerbalNoun.VERBAL_NOUN_FORM_VI, VerbalNoun.VERBAL_NOUN_FORM_VII],
    [VerbalNoun.VERBAL_NOUN_FORM_VIII, VerbalNoun.VERBAL_NOUN_FORM_IX, VerbalNoun.VERBAL_NOUN_FORM_X]
  ];

  private static getDefaultValues(form: NamedTemplate): VerbalNoun[][] {
    let defaultValues: VerbalNoun[][];
    const code = form.code;
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
    return defaultValues;
  }

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
    this.emitOnSelect();
  }

  private handleFormChanged() {
    this.buttons.forEach(button => button.select = false);
    const defaultValues = VerbalNounPickerComponent.getDefaultValues(this.form);

    if (defaultValues) {
      this.buttons.forEach(button => {
        defaultValues.forEach(values => {
          values.forEach(value => {
            if (button.value.name === value.name) {
              button.select = true;
            }
          }); // end of values.forEach
        }); // end of defaultValues.forEach
      }); // end of this.buttons.forEach
    } // end of if
    this.emitOnSelect();
  } // end of function handleFormChanged

  private emitOnSelect() {
    const result: any[] = [];
    let index = 0;
    this.buttons.forEach(button => {
      if (button.checked) {
        result[index++] = { 'checked': true, 'value': button.value };
      }
    });
    this.onSelect.emit(result);
  }

}
