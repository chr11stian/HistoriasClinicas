import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionPacienteRiesgoComponent } from './condicion-paciente-riesgo.component';

describe('CondicionPacienteRiesgoComponent', () => {
  let component: CondicionPacienteRiesgoComponent;
  let fixture: ComponentFixture<CondicionPacienteRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionPacienteRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionPacienteRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
