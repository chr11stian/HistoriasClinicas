import { TestBed } from '@angular/core/testing';

import { GrupoEtarioService } from './grupo-etario.service';

describe('GrupoEtarioService', () => {
  let service: GrupoEtarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoEtarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
