import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesAuxiliaresConsultaComponent } from './examenes-auxiliares-consulta.component';

describe('ExamenesAuxiliaresConsultaComponent', () => {
  let component: ExamenesAuxiliaresConsultaComponent;
  let fixture: ComponentFixture<ExamenesAuxiliaresConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenesAuxiliaresConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesAuxiliaresConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
