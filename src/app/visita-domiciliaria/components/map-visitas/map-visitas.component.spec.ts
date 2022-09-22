import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVisitasComponent } from './map-visitas.component';

describe('MapVisitasComponent', () => {
  let component: MapVisitasComponent;
  let fixture: ComponentFixture<MapVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapVisitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
