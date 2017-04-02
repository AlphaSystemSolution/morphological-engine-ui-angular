import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NounConjugationComponent } from './noun-conjugation.component';

describe('NounConjugationComponent', () => {
  let component: NounConjugationComponent;
  let fixture: ComponentFixture<NounConjugationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NounConjugationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NounConjugationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
