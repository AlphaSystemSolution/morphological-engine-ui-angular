import { Component, OnInit } from '@angular/core';
import { ApplicationControllerService } from '../../application-controller.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  constructor(public applicationController: ApplicationControllerService) { }

  ngOnInit() {
  }

  handleButtonClick(id: string) {
    console.log('Button clicked: ' + id);
  }

}
