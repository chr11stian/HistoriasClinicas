import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGeneralComponent } from './step-general.component';

describe('StepGeneralComponent', () => {
  let component: StepGeneralComponent;
  let fixture: ComponentFixture<StepGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
