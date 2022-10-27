import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisCrudComponent } from './his-crud.component';

describe('HisCrudComponent', () => {
  let component: HisCrudComponent;
  let fixture: ComponentFixture<HisCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HisCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
