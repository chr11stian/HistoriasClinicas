import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEstablecimientoComponent } from './categoria-establecimiento.component';

describe('CategoriaEstablecimientoComponent', () => {
  let component: CategoriaEstablecimientoComponent;
  let fixture: ComponentFixture<CategoriaEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaEstablecimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
