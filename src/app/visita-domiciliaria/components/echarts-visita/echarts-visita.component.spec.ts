import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsVisitaComponent } from './echarts-visita.component';

describe('EchartsVisitaComponent', () => {
  let component: EchartsVisitaComponent;
  let fixture: ComponentFixture<EchartsVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsVisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
