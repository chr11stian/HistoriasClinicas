import { TestBed } from '@angular/core/testing';

import { ObstetriciaGeneralService } from './obstetricia-general.service';

describe('ObstetriciaGeneralService', () => {
  let service: ObstetriciaGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObstetriciaGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
