import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasalesComponent } from './datos-basales.component';

describe('DatosBasalesComponent', () => {
  let component: DatosBasalesComponent;
  let fixture: ComponentFixture<DatosBasalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBasalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBasalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
