import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosajeComponent } from './dosaje.component';

describe('DosajeComponent', () => {
  let component: DosajeComponent;
  let fixture: ComponentFixture<DosajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DosajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
