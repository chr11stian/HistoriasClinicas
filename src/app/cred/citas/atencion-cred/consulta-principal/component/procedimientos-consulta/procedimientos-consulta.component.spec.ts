import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientosConsultaComponent } from './procedimientos-consulta.component';

describe('ProcedimientosConsultaComponent', () => {
  let component: ProcedimientosConsultaComponent;
  let fixture: ComponentFixture<ProcedimientosConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimientosConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
