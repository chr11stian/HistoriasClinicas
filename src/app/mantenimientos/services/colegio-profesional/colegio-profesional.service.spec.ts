import { TestBed } from '@angular/core/testing';

import { ColegioProfesionalService } from './colegio-profesional.service';

describe('ColegioProfesionalService', () => {
  let service: ColegioProfesionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColegioProfesionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
