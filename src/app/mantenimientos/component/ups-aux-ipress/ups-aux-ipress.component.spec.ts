import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsAuxIpressComponent } from './ups-aux-ipress.component';

describe('UpsAuxIpressComponent', () => {
  let component: UpsAuxIpressComponent;
  let fixture: ComponentFixture<UpsAuxIpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsAuxIpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsAuxIpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
