import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabInmunologiaComponent } from './lab-inmunologia.component';

describe('LabInmunologiaComponent', () => {
  let component: LabInmunologiaComponent;
  let fixture: ComponentFixture<LabInmunologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabInmunologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabInmunologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
