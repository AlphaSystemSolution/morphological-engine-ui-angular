import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArabicButtonComponent } from './arabic-button.component';

describe('ArabicButtonComponent', () => {
  let component: ArabicButtonComponent;
  let fixture: ComponentFixture<ArabicButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArabicButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArabicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
