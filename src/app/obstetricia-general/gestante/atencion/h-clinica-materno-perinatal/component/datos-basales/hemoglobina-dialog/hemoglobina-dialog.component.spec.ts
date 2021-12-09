import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HemoglobinaDialogComponent } from './hemoglobina-dialog.component';

describe('HemoglobinaDialogComponent', () => {
  let component: HemoglobinaDialogComponent;
  let fixture: ComponentFixture<HemoglobinaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HemoglobinaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HemoglobinaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
