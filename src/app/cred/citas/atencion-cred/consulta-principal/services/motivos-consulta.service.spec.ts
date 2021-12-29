import { TestBed } from '@angular/core/testing';

import { MotivosConsultaService } from './motivos-consulta.service';

describe('MotivosConsultaService', () => {
  let service: MotivosConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivosConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
