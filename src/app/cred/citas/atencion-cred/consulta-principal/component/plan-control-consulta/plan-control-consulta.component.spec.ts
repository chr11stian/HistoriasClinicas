import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanControlConsultaComponent } from './plan-control-consulta.component';

describe('PlanControlConsultaComponent', () => {
  let component: PlanControlConsultaComponent;
  let fixture: ComponentFixture<PlanControlConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanControlConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanControlConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
