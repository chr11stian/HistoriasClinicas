import { TestBed } from '@angular/core/testing';

import { DatosGeneralesPartoService } from './datos-generales-parto.service';

describe('DatosGeneralesPartoService', () => {
  let service: DatosGeneralesPartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosGeneralesPartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
