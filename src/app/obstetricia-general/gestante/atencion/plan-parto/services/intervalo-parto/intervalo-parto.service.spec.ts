import { TestBed } from '@angular/core/testing';

import { IntervaloPartoService } from './intervalo-parto.service';

describe('IntervaloPartoService', () => {
  let service: IntervaloPartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervaloPartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
