import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoLaboratorioComponent } from './pago-laboratorio.component';

describe('PagoLaboratorioComponent', () => {
  let component: PagoLaboratorioComponent;
  let fixture: ComponentFixture<PagoLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoLaboratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
