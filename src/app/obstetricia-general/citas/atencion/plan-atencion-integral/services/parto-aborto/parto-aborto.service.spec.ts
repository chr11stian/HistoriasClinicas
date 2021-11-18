import { TestBed } from '@angular/core/testing';

import { PartoAbortoService } from './parto-aborto.service';

describe('PartoAbortoService', () => {
  let service: PartoAbortoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartoAbortoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
