import { TestBed } from '@angular/core/testing';

import { RedServiciosSaludService } from './red-servicios-salud.service';

describe('RedServiciosSaludService', () => {
  let service: RedServiciosSaludService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedServiciosSaludService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
