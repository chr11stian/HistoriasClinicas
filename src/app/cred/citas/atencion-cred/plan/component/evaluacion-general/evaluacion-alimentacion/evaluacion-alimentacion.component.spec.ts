import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionAlimentacionComponent } from './evaluacion-alimentacion.component';

describe('EvaluacionAlimentacionComponent', () => {
  let component: EvaluacionAlimentacionComponent;
  let fixture: ComponentFixture<EvaluacionAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionAlimentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
