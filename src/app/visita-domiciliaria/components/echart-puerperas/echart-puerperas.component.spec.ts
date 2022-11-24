import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartPuerperasComponent } from './echart-puerperas.component';

describe('EchartPuerperasComponent', () => {
  let component: EchartPuerperasComponent;
  let fixture: ComponentFixture<EchartPuerperasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartPuerperasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartPuerperasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
