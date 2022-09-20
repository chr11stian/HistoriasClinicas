import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorIpressComponent } from './por-ipress.component';

describe('PorIpressComponent', () => {
  let component: PorIpressComponent;
  let fixture: ComponentFixture<PorIpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorIpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorIpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
