import { TestBed } from '@angular/core/testing';

import { SesionesAtencionTempranaService } from './sesiones-atencion-temprana.service';

describe('SesionesAtencionTempranaService', () => {
  let service: SesionesAtencionTempranaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionesAtencionTempranaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
