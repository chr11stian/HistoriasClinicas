import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabHematologiaComponent } from './lab-hematologia.component';

describe('LabHematologiaComponent', () => {
  let component: LabHematologiaComponent;
  let fixture: ComponentFixture<LabHematologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabHematologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabHematologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
