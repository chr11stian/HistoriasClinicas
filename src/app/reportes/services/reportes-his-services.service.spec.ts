import { TestBed } from '@angular/core/testing';

import { ReportesHisServicesService } from './reportes-his-services.service';

describe('ReportesHisServicesService', () => {
  let service: ReportesHisServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesHisServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
