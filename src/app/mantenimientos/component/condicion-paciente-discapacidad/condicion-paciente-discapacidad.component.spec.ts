import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionPacienteDiscapacidadComponent } from './condicion-paciente-discapacidad.component';

describe('CondicionPacienteDiscapacidadComponent', () => {
  let component: CondicionPacienteDiscapacidadComponent;
  let fixture: ComponentFixture<CondicionPacienteDiscapacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionPacienteDiscapacidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionPacienteDiscapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
