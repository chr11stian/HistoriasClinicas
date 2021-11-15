import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesPartoComponent } from './datos-generales-parto.component';

describe('DatosGeneralesPartoComponent', () => {
  let component: DatosGeneralesPartoComponent;
  let fixture: ComponentFixture<DatosGeneralesPartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosGeneralesPartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
