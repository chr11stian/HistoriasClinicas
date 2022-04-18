import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoGeneralComponent } from './tratamiento-general.component';

describe('TratamientoGeneralComponent', () => {
  let component: TratamientoGeneralComponent;
  let fixture: ComponentFixture<TratamientoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
