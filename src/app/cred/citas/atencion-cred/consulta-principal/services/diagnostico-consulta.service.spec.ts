import { TestBed } from '@angular/core/testing';

import { DiagnosticoConsultaService } from './diagnostico-consulta.service';

describe('DiagnosticoConsultaService', () => {
  let service: DiagnosticoConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticoConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
