import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisReportesComponent } from './his-reportes.component';

describe('HisReportesComponent', () => {
  let component: HisReportesComponent;
  let fixture: ComponentFixture<HisReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HisReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
