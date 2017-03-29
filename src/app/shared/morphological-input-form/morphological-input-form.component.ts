import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MorphologicalInputFormModel } from '../morphological-input-form-model';
import { ApplicationControllerService } from '../../application-controller.service';
import { ArabicKeyboardComponent } from '../arabic-keyboard/arabic-keyboard.component';
import { ArabicDropdownComponent } from '../arabic-dropdown/arabic-dropdown.component';
import { NamedTemplate, namedTemplates } from '../model';

@Component({
  selector: 'app-morphological-input-form',
  templateUrl: './morphological-input-form.component.html',
  styleUrls: ['./morphological-input-form.component.css']
})
export class MorphologicalInputFormComponent implements OnInit {

  // morphological Input Selection (MIS) form
  misForm: FormGroup;

  constructor(fb: FormBuilder, private applicationController: ApplicationControllerService, private router: Router) {
    this.misForm = fb.group({
      'rootLettersText': new FormControl(),
      'template': new FormControl(),
      'translation': new FormControl(),
      'removePassiveLine': new FormControl(),
      'skipRuleProcessing': new FormControl()
    });
  }

  ngOnInit() {
  }

  get namedTemplates(): NamedTemplate[] {
    return namedTemplates;
  }

  onSubmit(event) {
    this.applicationController.getMorphologicalChart();
    this.router.navigate(['staging']).then(() => {
      this.router.navigate(['morphological-chart']);
    });
  }

  handleClose(event) {
    this.applicationController.model.rootLetters = event.rootLetters;
  }

  viewDictionary() {
    this.applicationController.openWithRootLetters(this.applicationController.model.mInput.rootLetters);
  }

  hnadleSelectTemplate(event) {
    console.log(JSON.stringify(event));
  }

}
