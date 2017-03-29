import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbalNounPickerComponent } from './verbal-noun-picker.component';

describe('VerbalNounPickerComponent', () => {
  let component: VerbalNounPickerComponent;
  let fixture: ComponentFixture<VerbalNounPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbalNounPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbalNounPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
