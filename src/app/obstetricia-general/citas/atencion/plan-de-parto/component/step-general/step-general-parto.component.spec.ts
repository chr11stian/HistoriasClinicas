import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGeneralPartoComponent } from './step-general-parto.component';

describe('StepGeneralComponent', () => {
  let component: StepGeneralPartoComponent;
  let fixture: ComponentFixture<StepGeneralPartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepGeneralPartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGeneralPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
