import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnGestanteComponent } from './pn-gestante.component';

describe('PnGestanteComponent', () => {
  let component: PnGestanteComponent;
  let fixture: ComponentFixture<PnGestanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnGestanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnGestanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
