import { TestBed } from '@angular/core/testing';

import { EvalAlimenService } from './eval-alimen.service';

describe('EvalAlimenService', () => {
  let service: EvalAlimenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalAlimenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
