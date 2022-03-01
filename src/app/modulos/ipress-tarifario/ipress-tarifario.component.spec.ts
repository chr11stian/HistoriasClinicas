import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressTarifarioComponent } from './ipress-tarifario.component';

describe('IpressTarifarioComponent', () => {
  let component: IpressTarifarioComponent;
  let fixture: ComponentFixture<IpressTarifarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressTarifarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressTarifarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
