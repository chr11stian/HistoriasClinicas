import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPautaBreveComponent } from './plan-pauta-breve.component';

describe('PlanPautaBreveComponent', () => {
  let component: PlanPautaBreveComponent;
  let fixture: ComponentFixture<PlanPautaBreveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPautaBreveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPautaBreveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
