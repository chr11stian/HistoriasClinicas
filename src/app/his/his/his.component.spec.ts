import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisComponent } from './his.component';

describe('HisComponent', () => {
  let component: HisComponent;
  let fixture: ComponentFixture<HisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
