import { TestBed } from '@angular/core/testing';

import { ConsultaObstetriciaService } from './consulta-obstetricia.service';

describe('ConsultaObstetriciaService', () => {
  let service: ConsultaObstetriciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaObstetriciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
