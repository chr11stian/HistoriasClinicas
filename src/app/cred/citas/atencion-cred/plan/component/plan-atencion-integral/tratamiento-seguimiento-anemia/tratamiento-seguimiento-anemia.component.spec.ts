import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoSeguimientoAnemiaComponent } from './tratamiento-seguimiento-anemia.component';

describe('TratamientoSeguimientoAnemiaComponent', () => {
  let component: TratamientoSeguimientoAnemiaComponent;
  let fixture: ComponentFixture<TratamientoSeguimientoAnemiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoSeguimientoAnemiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoSeguimientoAnemiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
