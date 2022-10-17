import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasDomiciliariasPuerperaComponent } from './visitas-domiciliarias-puerpera.component';

describe('VisitasDomiciliariasPuerperaComponent', () => {
  let component: VisitasDomiciliariasPuerperaComponent;
  let fixture: ComponentFixture<VisitasDomiciliariasPuerperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasDomiciliariasPuerperaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasDomiciliariasPuerperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
