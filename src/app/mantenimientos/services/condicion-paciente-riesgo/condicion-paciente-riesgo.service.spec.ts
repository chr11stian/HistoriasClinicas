import { TestBed } from '@angular/core/testing';

import { CondicionPacienteRiesgoService } from './condicion-paciente-riesgo.service';

describe('CondicionPacienteRiesgoService', () => {
  let service: CondicionPacienteRiesgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondicionPacienteRiesgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
