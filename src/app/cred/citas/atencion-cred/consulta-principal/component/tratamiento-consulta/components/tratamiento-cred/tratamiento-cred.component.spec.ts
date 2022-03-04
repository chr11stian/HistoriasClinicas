import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoCredComponent } from './tratamiento-cred.component';

describe('TratamientoCredComponent', () => {
  let component: TratamientoCredComponent;
  let fixture: ComponentFixture<TratamientoCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamientoCredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
