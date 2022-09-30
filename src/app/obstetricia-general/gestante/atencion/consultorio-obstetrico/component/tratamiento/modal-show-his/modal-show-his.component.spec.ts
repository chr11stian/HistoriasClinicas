import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowHisComponent } from './modal-show-his.component';

describe('ModalShowHisComponent', () => {
  let component: ModalShowHisComponent;
  let fixture: ComponentFixture<ModalShowHisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalShowHisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
