import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAntecedentesComponent } from './modal-antecedentes.component';

describe('ModalAntecedentesComponent', () => {
  let component: ModalAntecedentesComponent;
  let fixture: ComponentFixture<ModalAntecedentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAntecedentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAntecedentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
