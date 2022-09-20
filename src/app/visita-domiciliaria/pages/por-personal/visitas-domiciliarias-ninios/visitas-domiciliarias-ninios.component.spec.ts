import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasDomiciliariasNiniosComponent } from './visitas-domiciliarias-ninios.component';

describe('VisitasDomiciliariasNiniosComponent', () => {
  let component: VisitasDomiciliariasNiniosComponent;
  let fixture: ComponentFixture<VisitasDomiciliariasNiniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasDomiciliariasNiniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasDomiciliariasNiniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
