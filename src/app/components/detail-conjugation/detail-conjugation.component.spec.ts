import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConjugationComponent } from './detail-conjugation.component';

describe('DetailConjugationComponent', () => {
  let component: DetailConjugationComponent;
  let fixture: ComponentFixture<DetailConjugationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailConjugationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailConjugationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
