import { TestBed } from '@angular/core/testing';

import { PlanAtencionAdolescenteTablasService } from './plan-atencion-adolescente-tablas.service';

describe('PlanAtencionAdolescenteTablasService', () => {
  let service: PlanAtencionAdolescenteTablasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanAtencionAdolescenteTablasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
