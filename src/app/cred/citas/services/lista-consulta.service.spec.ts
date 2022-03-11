import { TestBed } from '@angular/core/testing';

import { ListaConsultaService } from './lista-consulta.service';

describe('ListaConsultaService', () => {
  let service: ListaConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
