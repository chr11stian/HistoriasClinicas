import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAtencionIntegralComponent } from './plan-atencion-integral.component';

describe('PlanAtencionIntegralComponent', () => {
  let component: PlanAtencionIntegralComponent;
  let fixture: ComponentFixture<PlanAtencionIntegralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanAtencionIntegralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAtencionIntegralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
