import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreComercialUPSComponent } from './nombre-comercial-ups.component';

describe('NombreComercialUPSComponent', () => {
  let component: NombreComercialUPSComponent;
  let fixture: ComponentFixture<NombreComercialUPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NombreComercialUPSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreComercialUPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
