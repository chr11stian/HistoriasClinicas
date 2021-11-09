import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplementacionTratamientoComponent } from './suplementacion-tratamiento.component';

describe('SuplementacionTratamientoComponent', () => {
  let component: SuplementacionTratamientoComponent;
  let fixture: ComponentFixture<SuplementacionTratamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplementacionTratamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplementacionTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
