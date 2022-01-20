import { TestBed } from '@angular/core/testing';

import { FinalizarConsultaService } from './finalizar-consulta.service';

describe('FinalizarConsultaService', () => {
  let service: FinalizarConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalizarConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
