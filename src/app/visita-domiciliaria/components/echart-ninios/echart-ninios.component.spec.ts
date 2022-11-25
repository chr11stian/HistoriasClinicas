import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartNiniosComponent } from './echart-ninios.component';

describe('EchartNiniosComponent', () => {
  let component: EchartNiniosComponent;
  let fixture: ComponentFixture<EchartNiniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartNiniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartNiniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
