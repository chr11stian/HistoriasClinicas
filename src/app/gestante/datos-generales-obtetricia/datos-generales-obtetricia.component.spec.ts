import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesObtetriciaComponent } from './datos-generales-obtetricia.component';

describe('DatosGeneralesObtetriciaComponent', () => {
  let component: DatosGeneralesObtetriciaComponent;
  let fixture: ComponentFixture<DatosGeneralesObtetriciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosGeneralesObtetriciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesObtetriciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
