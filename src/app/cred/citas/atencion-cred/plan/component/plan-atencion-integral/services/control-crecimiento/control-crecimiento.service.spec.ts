import { TestBed } from '@angular/core/testing';

import { ControlCrecimientoService } from './control-crecimiento.service';

describe('ControlCrecimientoService', () => {
  let service: ControlCrecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlCrecimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
