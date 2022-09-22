import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasDomiciliariasGestantesComponent } from './visitas-domiciliarias-gestantes.component';

describe('VisitasDomiciliariasGestantesComponent', () => {
  let component: VisitasDomiciliariasGestantesComponent;
  let fixture: ComponentFixture<VisitasDomiciliariasGestantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasDomiciliariasGestantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasDomiciliariasGestantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
