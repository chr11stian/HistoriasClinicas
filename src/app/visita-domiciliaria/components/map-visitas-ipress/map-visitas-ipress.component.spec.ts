import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVisitasIpressComponent } from './map-visitas-ipress.component';

describe('MapVisitasIpressComponent', () => {
  let component: MapVisitasIpressComponent;
  let fixture: ComponentFixture<MapVisitasIpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapVisitasIpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVisitasIpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
