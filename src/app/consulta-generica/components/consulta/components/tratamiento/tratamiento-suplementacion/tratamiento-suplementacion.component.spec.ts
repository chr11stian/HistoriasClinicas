import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoSuplementacionComponent } from './tratamiento-suplementacion.component';

describe('TratamientoSuplementacionComponent', () => {
  let component: TratamientoSuplementacionComponent;
  let fixture: ComponentFixture<TratamientoSuplementacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoSuplementacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoSuplementacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
