import { TestBed } from '@angular/core/testing';

import { CategoriaEstablecimientoService } from './categoria-establecimiento.service';

describe('CategoriaEstablecimientoService', () => {
  let service: CategoriaEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaEstablecimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
