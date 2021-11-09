import { TestBed } from '@angular/core/testing';

import { CondicionPacienteService } from './condicion-paciente.service';

describe('CondicionPacienteService', () => {
  let service: CondicionPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondicionPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
