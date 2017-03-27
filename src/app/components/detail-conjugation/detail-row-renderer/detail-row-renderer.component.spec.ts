import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRowRendererComponent } from './detail-row-renderer.component';

describe('DetailRowRendererComponent', () => {
  let component: DetailRowRendererComponent;
  let fixture: ComponentFixture<DetailRowRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRowRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRowRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
