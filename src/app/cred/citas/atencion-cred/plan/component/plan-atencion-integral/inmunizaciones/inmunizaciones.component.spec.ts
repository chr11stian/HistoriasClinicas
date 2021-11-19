import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmunizacionesComponent } from './inmunizaciones.component';

describe('InmunizacionesComponent', () => {
  let component: InmunizacionesComponent;
  let fixture: ComponentFixture<InmunizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmunizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InmunizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
