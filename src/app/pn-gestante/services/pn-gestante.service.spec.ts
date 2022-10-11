import { TestBed } from '@angular/core/testing';

import { PnGestanteService } from './pn-gestante.service';

describe('PnGestanteService', () => {
  let service: PnGestanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnGestanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
