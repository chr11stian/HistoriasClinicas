import { TestBed } from '@angular/core/testing';

import { TamizajesService } from './tamizajes.service';

describe('TamizajesService', () => {
  let service: TamizajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamizajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
