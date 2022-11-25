import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartGestantesComponent } from './echart-gestantes.component';

describe('EchartGestantesComponent', () => {
  let component: EchartGestantesComponent;
  let fixture: ComponentFixture<EchartGestantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartGestantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartGestantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
