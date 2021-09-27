import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegioProfesionalComponent } from './colegio-profesional.component';

describe('ColegioProfesionalComponent', () => {
  let component: ColegioProfesionalComponent;
  let fixture: ComponentFixture<ColegioProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColegioProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColegioProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
