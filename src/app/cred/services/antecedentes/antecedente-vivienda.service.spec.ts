import { TestBed } from '@angular/core/testing';

import { AntecedenteViviendaService } from './antecedente-vivienda.service';

describe('AntecedenteViviendaService', () => {
  let service: AntecedenteViviendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntecedenteViviendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
