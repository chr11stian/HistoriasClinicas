import { TestBed } from '@angular/core/testing';

import { AdolecenteService } from './adolecente.service';

describe('AdolecenteService', () => {
  let service: AdolecenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdolecenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
