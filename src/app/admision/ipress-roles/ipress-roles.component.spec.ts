import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressRolesComponent } from './ipress-roles.component';

describe('IpressRolesComponent', () => {
  let component: IpressRolesComponent;
  let fixture: ComponentFixture<IpressRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
