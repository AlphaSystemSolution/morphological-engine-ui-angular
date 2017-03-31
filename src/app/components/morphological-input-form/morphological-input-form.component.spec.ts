import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorphologicalInputFormComponent } from './morphological-input-form.component';

describe('MorphologicalInputFormComponent', () => {
  let component: MorphologicalInputFormComponent;
  let fixture: ComponentFixture<MorphologicalInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorphologicalInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorphologicalInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
