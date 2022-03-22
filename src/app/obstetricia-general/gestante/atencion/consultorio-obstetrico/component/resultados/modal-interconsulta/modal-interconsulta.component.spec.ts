import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInterconsultaComponent } from './modal-interconsulta.component';

describe('ModalInterconsultaComponent', () => {
  let component: ModalInterconsultaComponent;
  let fixture: ComponentFixture<ModalInterconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInterconsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInterconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
