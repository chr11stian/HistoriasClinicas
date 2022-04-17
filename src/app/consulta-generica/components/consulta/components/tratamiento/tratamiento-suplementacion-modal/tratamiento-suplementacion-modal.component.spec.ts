import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoSuplementacionModalComponent } from './tratamiento-suplementacion-modal.component';

describe('TratamientoSuplementacionModalComponent', () => {
  let component: TratamientoSuplementacionModalComponent;
  let fixture: ComponentFixture<TratamientoSuplementacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoSuplementacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoSuplementacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
