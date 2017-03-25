import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorphologicalChartComponent } from './morphological-chart.component';

describe('MorphologicalChartComponent', () => {
  let component: MorphologicalChartComponent;
  let fixture: ComponentFixture<MorphologicalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorphologicalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorphologicalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
