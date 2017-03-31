import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportConjugationComponent } from './export-conjugation.component';

describe('ExportConjugationComponent', () => {
  let component: ExportConjugationComponent;
  let fixture: ComponentFixture<ExportConjugationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportConjugationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportConjugationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
