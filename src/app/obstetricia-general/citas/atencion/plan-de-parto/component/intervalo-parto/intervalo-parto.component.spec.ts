import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervaloPartoComponent } from './intervalo-parto.component';

describe('IntervaloPartoComponent', () => {
  let component: IntervaloPartoComponent;
  let fixture: ComponentFixture<IntervaloPartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervaloPartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervaloPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
