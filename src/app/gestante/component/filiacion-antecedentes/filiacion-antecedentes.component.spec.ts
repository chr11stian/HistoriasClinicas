import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliacionAntecedentesComponent } from './filiacion-antecedentes.component';

describe('DatosGeneralesComponent', () => {
  let component: FiliacionAntecedentesComponent;
  let fixture: ComponentFixture<FiliacionAntecedentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiliacionAntecedentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliacionAntecedentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
