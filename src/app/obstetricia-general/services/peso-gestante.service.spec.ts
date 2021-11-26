import { TestBed } from '@angular/core/testing';

import { PesoGestanteGraphService } from './peso-gestante-graph.service';

describe('PesoGestanteService', () => {
  let service: PesoGestanteGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesoGestanteGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
