import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoSeguimientoAnemiaConsultaComponent } from './tratamiento-seguimiento-anemia-consulta.component';

describe('TratamientoSeguimientoAnemiaConsultaComponent', () => {
  let component: TratamientoSeguimientoAnemiaConsultaComponent;
  let fixture: ComponentFixture<TratamientoSeguimientoAnemiaConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoSeguimientoAnemiaConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoSeguimientoAnemiaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
