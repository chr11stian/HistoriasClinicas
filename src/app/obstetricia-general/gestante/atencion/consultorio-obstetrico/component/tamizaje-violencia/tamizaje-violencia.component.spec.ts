import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamizajeViolenciaComponent } from './tamizaje-violencia.component';

describe('TamizajeViolenciaComponent', () => {
  let component: TamizajeViolenciaComponent;
  let fixture: ComponentFixture<TamizajeViolenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamizajeViolenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TamizajeViolenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
