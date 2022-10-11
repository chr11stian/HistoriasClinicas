import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnGestanteDiaGestaComponent } from './pn-gestante-dia-gesta.component';

describe('PnGestanteDiaGestaComponent', () => {
  let component: PnGestanteDiaGestaComponent;
  let fixture: ComponentFixture<PnGestanteDiaGestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnGestanteDiaGestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnGestanteDiaGestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
