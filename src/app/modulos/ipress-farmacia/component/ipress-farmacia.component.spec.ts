import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressFarmaciaComponent } from './ipress-farmacia.component';

describe('IpressFarmaciaComponent', () => {
  let component: IpressFarmaciaComponent;
  let fixture: ComponentFixture<IpressFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressFarmaciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
