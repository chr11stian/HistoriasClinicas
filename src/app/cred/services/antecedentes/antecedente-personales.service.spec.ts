import { TestBed } from '@angular/core/testing';

import { AntecedentePersonalesService } from './antecedente-personales.service';

describe('AntecedentePersonalesService', () => {
  let service: AntecedentePersonalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedentePersonalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
