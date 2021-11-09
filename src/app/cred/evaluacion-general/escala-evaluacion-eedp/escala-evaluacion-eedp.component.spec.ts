import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaEvaluacionEEDPComponent } from './escala-evaluacion-eedp.component';

describe('EscalaEvaluacionEEDPComponent', () => {
  let component: EscalaEvaluacionEEDPComponent;
  let fixture: ComponentFixture<EscalaEvaluacionEEDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalaEvaluacionEEDPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaEvaluacionEEDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
