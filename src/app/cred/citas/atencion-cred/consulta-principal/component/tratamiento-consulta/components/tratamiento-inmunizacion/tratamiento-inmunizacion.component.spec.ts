import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoInmunizacionComponent } from './tratamiento-inmunizacion.component';

describe('TratamientoInmunizacionComponent', () => {
  let component: TratamientoInmunizacionComponent;
  let fixture: ComponentFixture<TratamientoInmunizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoInmunizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoInmunizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
