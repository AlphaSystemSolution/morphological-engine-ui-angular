import { Component, Input, OnInit } from '@angular/core';
import { DetailedConjugation } from '../../model/detailed-conjugation';

@Component({
  selector: 'app-detail-conjugation',
  templateUrl: './detail-conjugation.component.html',
  styleUrls: ['./detail-conjugation.component.css']
})
export class DetailConjugationComponent implements OnInit {

  @Input() detailedConjugation: DetailedConjugation;
  @Input() title: string;
  show: boolean;

  constructor() { }

  ngOnInit() {
    this.show = this.detailedConjugation !== null;
  }

}
