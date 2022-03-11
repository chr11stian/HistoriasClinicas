import { TestBed } from '@angular/core/testing';

import { IpressFarmaciaService } from './ipress-farmacia.service';

describe('IpressFarmaciaService', () => {
  let service: IpressFarmaciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpressFarmaciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
