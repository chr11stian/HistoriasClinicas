import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTriajeComponent } from './registrar-triaje.component';

describe('RegistrarTriajeComponent', () => {
  let component: RegistrarTriajeComponent;
  let fixture: ComponentFixture<RegistrarTriajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarTriajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarTriajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
