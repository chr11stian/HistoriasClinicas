import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCupos2Component } from './modal-cupos2.component';

describe('ModalCupos2Component', () => {
  let component: ModalCupos2Component;
  let fixture: ComponentFixture<ModalCupos2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCupos2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCupos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
