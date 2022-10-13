import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnGestanteDialogComponent } from './pn-gestante-dialog.component';

describe('PnGestanteDialogComponent', () => {
  let component: PnGestanteDialogComponent;
  let fixture: ComponentFixture<PnGestanteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnGestanteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnGestanteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
