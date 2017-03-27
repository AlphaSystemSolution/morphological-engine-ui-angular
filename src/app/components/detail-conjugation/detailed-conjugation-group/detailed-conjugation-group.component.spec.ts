import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedConjugationGroupComponent } from './detailed-conjugation-group.component';

describe('DetailedConjugationGroupComponent', () => {
  let component: DetailedConjugationGroupComponent;
  let fixture: ComponentFixture<DetailedConjugationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedConjugationGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedConjugationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
