import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasGestantesIpressComponent } from './visitas-gestantes-ipress.component';

describe('VisitasGestantesIpressComponent', () => {
  let component: VisitasGestantesIpressComponent;
  let fixture: ComponentFixture<VisitasGestantesIpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasGestantesIpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasGestantesIpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
