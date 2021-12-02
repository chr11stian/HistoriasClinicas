import { TestBed } from '@angular/core/testing';

import { TratamientoSeguimientoAnemiaService } from './tratamiento-seguimiento-anemia.service';

describe('TratamientoSeguimientoAnemiaService', () => {
  let service: TratamientoSeguimientoAnemiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratamientoSeguimientoAnemiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
