import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegioProfesionalModalComponent } from './colegio-profesional-modal.component';

describe('ColegioProfesionalModalComponent', () => {
  let component: ColegioProfesionalModalComponent;
  let fixture: ComponentFixture<ColegioProfesionalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColegioProfesionalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColegioProfesionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
