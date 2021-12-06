import { TestBed } from '@angular/core/testing';

import { ReproCitasService } from './repro-citas.service';

describe('ReproCitasService', () => {
  let service: ReproCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReproCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
