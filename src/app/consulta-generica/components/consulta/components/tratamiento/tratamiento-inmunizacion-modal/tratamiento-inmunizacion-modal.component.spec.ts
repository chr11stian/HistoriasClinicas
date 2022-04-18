import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoInmunizacionModalComponent } from './tratamiento-inmunizacion-modal.component';

describe('TratamientoInmunizacionModalComponent', () => {
  let component: TratamientoInmunizacionModalComponent;
  let fixture: ComponentFixture<TratamientoInmunizacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoInmunizacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoInmunizacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
