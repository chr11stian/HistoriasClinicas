import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionGeneralComponent } from './evaluacion-general.component';

describe('EvaluacionGeneralComponent', () => {
  let component: EvaluacionGeneralComponent;
  let fixture: ComponentFixture<EvaluacionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
