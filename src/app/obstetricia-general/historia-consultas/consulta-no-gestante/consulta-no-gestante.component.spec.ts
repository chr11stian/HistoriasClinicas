import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNoGestanteComponent } from './consulta-no-gestante.component';

describe('ConsultaNoGestanteComponent', () => {
  let component: ConsultaNoGestanteComponent;
  let fixture: ComponentFixture<ConsultaNoGestanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaNoGestanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNoGestanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
