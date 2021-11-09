import { TestBed } from '@angular/core/testing';

import { WeightAgeService } from './weight-age.service';

describe('WeightAgeService', () => {
  let service: WeightAgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightAgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
