import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmunizacionComponent } from './inmunizacion.component';

describe('InmunizacionComponent', () => {
  let component: InmunizacionComponent;
  let fixture: ComponentFixture<InmunizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmunizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InmunizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
