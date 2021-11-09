import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionPacienteComponent } from './condicion-paciente.component';

describe('CondicionPacienteComponent', () => {
  let component: CondicionPacienteComponent;
  let fixture: ComponentFixture<CondicionPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicionPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
