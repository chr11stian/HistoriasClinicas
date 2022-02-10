import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressTurnosComponent } from './ipress-turnos.component';

describe('IpressTurnosComponent', () => {
  let component: IpressTurnosComponent;
  let fixture: ComponentFixture<IpressTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
