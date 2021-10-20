import { TestBed } from '@angular/core/testing';

import { IpressService } from './ipress.service';

describe('IpressService', () => {
  let service: IpressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
