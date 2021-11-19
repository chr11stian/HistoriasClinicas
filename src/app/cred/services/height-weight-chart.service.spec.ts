import { TestBed } from '@angular/core/testing';

import { HeightWeightChartService } from './height-weight-chart.service';

describe('HeightWeightChartService', () => {
  let service: HeightWeightChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeightWeightChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
