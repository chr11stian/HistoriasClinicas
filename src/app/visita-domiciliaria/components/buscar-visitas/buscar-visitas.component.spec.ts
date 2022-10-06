import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarVisitasComponent } from './buscar-visitas.component';

describe('BuscarVisitasComponent', () => {
  let component: BuscarVisitasComponent;
  let fixture: ComponentFixture<BuscarVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarVisitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
