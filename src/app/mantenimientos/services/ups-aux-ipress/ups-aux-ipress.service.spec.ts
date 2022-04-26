import { TestBed } from '@angular/core/testing';

import { UpsAuxIpressService } from './ups-aux-ipress.service';

describe('UpsAuxIpressService', () => {
  let service: UpsAuxIpressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpsAuxIpressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
