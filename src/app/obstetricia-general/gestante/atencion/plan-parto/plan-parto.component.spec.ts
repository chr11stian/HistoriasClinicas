import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPartoComponent } from './plan-parto.component';

describe('PlanPartoComponent', () => {
  let component: PlanPartoComponent;
  let fixture: ComponentFixture<PlanPartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
