import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbreviatedConjugationComponent } from './abbreviated-conjugation.component';

describe('AbbreviatedConjugationComponent', () => {
  let component: AbbreviatedConjugationComponent;
  let fixture: ComponentFixture<AbbreviatedConjugationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbbreviatedConjugationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbbreviatedConjugationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
