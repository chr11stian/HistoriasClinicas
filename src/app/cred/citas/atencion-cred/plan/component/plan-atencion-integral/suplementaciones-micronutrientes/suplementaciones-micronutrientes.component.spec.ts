import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplementacionesMicronutrientesComponent } from './suplementaciones-micronutrientes.component';

describe('SuplementacionesMicronutrientesComponent', () => {
  let component: SuplementacionesMicronutrientesComponent;
  let fixture: ComponentFixture<SuplementacionesMicronutrientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplementacionesMicronutrientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplementacionesMicronutrientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
