import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcedimientosComponent } from './modal-procedimientos.component';

describe('ModalProcedimientosComponent', () => {
  let component: ModalProcedimientosComponent;
  let fixture: ComponentFixture<ModalProcedimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProcedimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
