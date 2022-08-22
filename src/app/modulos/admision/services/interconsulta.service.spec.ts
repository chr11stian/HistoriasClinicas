import { TestBed } from '@angular/core/testing';

import { InterconsultaService } from './interconsulta.service';

describe('InterconsultaService', () => {
  let service: InterconsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterconsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
