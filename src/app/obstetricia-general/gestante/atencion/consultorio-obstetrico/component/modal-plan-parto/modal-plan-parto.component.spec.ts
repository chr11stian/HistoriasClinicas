import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanPartoComponent } from './modal-plan-parto.component';

describe('ModalPlanPartoComponent', () => {
  let component: ModalPlanPartoComponent;
  let fixture: ComponentFixture<ModalPlanPartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlanPartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlanPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
