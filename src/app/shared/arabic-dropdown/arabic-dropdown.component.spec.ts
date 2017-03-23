import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArabicDropdownComponent } from './arabic-dropdown.component';

describe('ArabicDropdownComponent', () => {
  let component: ArabicDropdownComponent;
  let fixture: ComponentFixture<ArabicDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArabicDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArabicDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
