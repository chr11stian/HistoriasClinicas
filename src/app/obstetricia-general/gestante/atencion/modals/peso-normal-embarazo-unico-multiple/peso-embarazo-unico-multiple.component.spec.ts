import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoEmbarazoUnicoMultipleComponent } from './peso-embarazo-unico-multiple.component';

describe('PesoNormalEmbarazoUnicoMultipleComponent', () => {
  let component: PesoEmbarazoUnicoMultipleComponent;
  let fixture: ComponentFixture<PesoEmbarazoUnicoMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesoEmbarazoUnicoMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesoEmbarazoUnicoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
