import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionPacienteDiscapacidadModalComponent } from './condicion-paciente-discapacidad-modal.component';

describe('CondicionPacienteDiscapacidadModalComponent', () => {
  let component: CondicionPacienteDiscapacidadModalComponent;
  let fixture: ComponentFixture<CondicionPacienteDiscapacidadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionPacienteDiscapacidadModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionPacienteDiscapacidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
