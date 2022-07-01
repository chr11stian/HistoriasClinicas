import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtencionPlanComponent } from './modal-atencion-plan.component';

describe('ModalAtencionPlanComponent', () => {
  let component: ModalAtencionPlanComponent;
  let fixture: ComponentFixture<ModalAtencionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtencionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAtencionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
