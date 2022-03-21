import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmunizacionesCredComponent } from './inmunizaciones-cred.component';

describe('InmunizacionesCredComponent', () => {
  let component: InmunizacionesCredComponent;
  let fixture: ComponentFixture<InmunizacionesCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmunizacionesCredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InmunizacionesCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
