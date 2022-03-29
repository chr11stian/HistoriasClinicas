import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSolicitudComponent } from './lab-solicitud.component';

describe('LabSolicitudComponent', () => {
  let component: LabSolicitudComponent;
  let fixture: ComponentFixture<LabSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
