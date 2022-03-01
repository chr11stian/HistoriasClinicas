import { TestBed } from '@angular/core/testing';

import { AntecedentesPacienteService } from './antecedentes-paciente.service';

describe('AntecedentesPacienteService', () => {
  let service: AntecedentesPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedentesPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
