import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescarteObservacionesComponent } from './descarte-observaciones.component';

describe('DescarteObservacionesComponent', () => {
  let component: DescarteObservacionesComponent;
  let fixture: ComponentFixture<DescarteObservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescarteObservacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescarteObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
