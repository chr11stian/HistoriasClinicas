import { TestBed } from '@angular/core/testing';

import { DescartesService } from './descartes.service';

describe('DescartesService', () => {
  let service: DescartesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescartesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
