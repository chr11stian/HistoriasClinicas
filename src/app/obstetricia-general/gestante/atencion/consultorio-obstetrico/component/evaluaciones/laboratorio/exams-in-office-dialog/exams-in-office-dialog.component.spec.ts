import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsInOfficeDialogComponent } from './exams-in-office-dialog.component';

describe('ExamsInOfficeDialogComponent', () => {
  let component: ExamsInOfficeDialogComponent;
  let fixture: ComponentFixture<ExamsInOfficeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsInOfficeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsInOfficeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
