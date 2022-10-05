import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasNiniosIpressComponent } from './visitas-ninios-ipress.component';

describe('VisitasNiniosIpressComponent', () => {
  let component: VisitasNiniosIpressComponent;
  let fixture: ComponentFixture<VisitasNiniosIpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasNiniosIpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasNiniosIpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
