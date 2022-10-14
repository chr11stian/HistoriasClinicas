import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnDialogGestaComponent } from './pn-dialog-gesta.component';

describe('PnDialogGestaComponent', () => {
  let component: PnDialogGestaComponent;
  let fixture: ComponentFixture<PnDialogGestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnDialogGestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnDialogGestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
