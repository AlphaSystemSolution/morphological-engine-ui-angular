import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArabicKeyboardComponent } from './arabic-keyboard.component';

describe('ArabicKeyboardComponent', () => {
  let component: ArabicKeyboardComponent;
  let fixture: ComponentFixture<ArabicKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArabicKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArabicKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
