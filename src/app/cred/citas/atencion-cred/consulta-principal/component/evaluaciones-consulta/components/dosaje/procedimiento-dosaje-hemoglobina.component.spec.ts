import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimientoDosajeHemoglobinaComponent } from './procedimiento-dosaje-hemoglobina.component';

describe('ProcedimientoDosajeHemoglobinaComponent', () => {
  let component: ProcedimientoDosajeHemoglobinaComponent;
  let fixture: ComponentFixture<ProcedimientoDosajeHemoglobinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedimientoDosajeHemoglobinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimientoDosajeHemoglobinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
