import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasNoControlComponent } from './consultas-no-control.component';

describe('ConsultasNoControlComponent', () => {
  let component: ConsultasNoControlComponent;
  let fixture: ComponentFixture<ConsultasNoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasNoControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasNoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
