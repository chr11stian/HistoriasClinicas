import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesPacienteComponent } from './antecedentes-paciente.component';

describe('AntecedentesPacienteComponent', () => {
  let component: AntecedentesPacienteComponent;
  let fixture: ComponentFixture<AntecedentesPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentesPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
