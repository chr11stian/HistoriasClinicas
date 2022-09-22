import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryResultDialogComponent } from './laboratory-result-dialog.component';

describe('LaboratoryResultDialogComponent', () => {
  let component: LaboratoryResultDialogComponent;
  let fixture: ComponentFixture<LaboratoryResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryResultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
