import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrecimientoEstadoNutricionalComponent } from './crecimiento-estado-nutricional.component';

describe('CrecimientoEstadoNutricionalComponent', () => {
  let component: CrecimientoEstadoNutricionalComponent;
  let fixture: ComponentFixture<CrecimientoEstadoNutricionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrecimientoEstadoNutricionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrecimientoEstadoNutricionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
