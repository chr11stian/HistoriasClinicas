import { TestBed } from '@angular/core/testing';

import { ProcedimientosService } from './procedimientos.service';

describe('ProcedimientosService', () => {
  let service: ProcedimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
