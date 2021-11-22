import { TestBed } from '@angular/core/testing';

import { FillDataGraphService } from './fill-data-graph.service';

describe('FillDataGraphService', () => {
  let service: FillDataGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillDataGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
