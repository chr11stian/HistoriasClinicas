import { TestBed } from '@angular/core/testing';

import { InmunizacionesService } from './inmunizaciones.service';

describe('InmunizacionesService', () => {
  let service: InmunizacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmunizacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
