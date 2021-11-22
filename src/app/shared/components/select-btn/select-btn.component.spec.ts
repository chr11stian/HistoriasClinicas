import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBtnComponent } from './select-btn.component';

describe('SelectBtnComponent', () => {
  let component: SelectBtnComponent;
  let fixture: ComponentFixture<SelectBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
