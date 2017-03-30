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
    [verbalNounPatterns[0], verbalNounPatterns[1], verbalNounPatterns[3], verbalNounPatterns[4], verbalNounPatterns[5]],
    [verbalNounPatterns[6], verbalNounPatterns[7], verbalNounPatterns[8], verbalNounPatterns[9], verbalNounPatterns[10]],
    [verbalNounPatterns[11], verbalNounPatterns[12], verbalNounPatterns[13], verbalNounPatterns[14], verbalNounPatterns[26]],
    [verbalNounPatterns[27], verbalNounPatterns[28], verbalNounPatterns[30], verbalNounPatterns[31]],
    [verbalNounPatterns[33], verbalNounPatterns[34], verbalNounPatterns[35], verbalNounPatterns[36]],
    [verbalNounPatterns[37], verbalNounPatterns[38], verbalNounPatterns[39]]
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
