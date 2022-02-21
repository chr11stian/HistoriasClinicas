import { TestBed } from '@angular/core/testing';

import { CuposTriajeService } from './cupos-triaje.service';

describe('CuposTriajeService', () => {
  let service: CuposTriajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuposTriajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
