import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoProcedimientosComponent } from './pago-procedimientos.component';

describe('PagoProcedimientosComponent', () => {
  let component: PagoProcedimientosComponent;
  let fixture: ComponentFixture<PagoProcedimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoProcedimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
