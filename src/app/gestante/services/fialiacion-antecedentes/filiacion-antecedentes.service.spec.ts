import { TestBed } from '@angular/core/testing';

import { FiliacionAntecedentesService } from './filiacion-antecedentes.service';

describe('FiliacionAntecedentesService', () => {
  let service: FiliacionAntecedentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiliacionAntecedentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
