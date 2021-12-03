import { TestBed } from '@angular/core/testing';

import { SuplementacionesMicronutrientesService } from './suplementaciones-micronutrientes.service';

describe('SuplementacionesMicronutrientesService', () => {
  let service: SuplementacionesMicronutrientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuplementacionesMicronutrientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
