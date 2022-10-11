import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnGestanteDiaCambioComponent } from './pn-gestante-dia-cambio.component';

describe('PnGestanteDiaCambioComponent', () => {
  let component: PnGestanteDiaCambioComponent;
  let fixture: ComponentFixture<PnGestanteDiaCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnGestanteDiaCambioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnGestanteDiaCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
