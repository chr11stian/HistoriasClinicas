import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolGuardiaComponent } from './rol-guardia.component';

describe('RolGuardiaComponent', () => {
  let component: RolGuardiaComponent;
  let fixture: ComponentFixture<RolGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
