import { TestBed } from '@angular/core/testing';

import { TratamientoConsultaService } from './tratamiento-consulta.service';

describe('TratamientoConsultaService', () => {
  let service: TratamientoConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratamientoConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
