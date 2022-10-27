import { TestBed } from '@angular/core/testing';

import { HisCrudServiceService } from './his-crud-service.service';

describe('HisCrudServiceService', () => {
  let service: HisCrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HisCrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
