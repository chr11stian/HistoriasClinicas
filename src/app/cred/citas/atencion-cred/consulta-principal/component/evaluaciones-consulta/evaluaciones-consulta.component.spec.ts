import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesConsultaComponent } from './evaluaciones-consulta.component';

describe('EvaluacionesConsultaComponent', () => {
  let component: EvaluacionesConsultaComponent;
  let fixture: ComponentFixture<EvaluacionesConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionesConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionesConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
