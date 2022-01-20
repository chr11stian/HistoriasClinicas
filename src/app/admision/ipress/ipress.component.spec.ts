import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressComponent } from './ipress.component';

describe('IpressComponent', () => {
  let component: IpressComponent;
  let fixture: ComponentFixture<IpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
