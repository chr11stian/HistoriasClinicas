import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExamenesFetalesComponent } from './dialog-examenes-fetales.component';

describe('DialogExamenesFetalesComponent', () => {
  let component: DialogExamenesFetalesComponent;
  let fixture: ComponentFixture<DialogExamenesFetalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExamenesFetalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExamenesFetalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
