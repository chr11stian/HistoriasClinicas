import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMedicamentosComponent } from './modal-medicamentos.component';

describe('ModalMedicamentosComponent', () => {
  let component: ModalMedicamentosComponent;
  let fixture: ComponentFixture<ModalMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMedicamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
