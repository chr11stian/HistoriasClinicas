import { TestBed } from '@angular/core/testing';

import { NombreComercialUPSService } from './nombre-comercial-ups.service';

describe('NombreComercialUPSService', () => {
  let service: NombreComercialUPSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombreComercialUPSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
