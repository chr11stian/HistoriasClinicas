import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressAmbientesComponent } from './ipress-ambientes.component';

describe('IpressAmbientesComponent', () => {
  let component: IpressAmbientesComponent;
  let fixture: ComponentFixture<IpressAmbientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressAmbientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressAmbientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
