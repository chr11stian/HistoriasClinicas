import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEDPComponent } from './eedp.component';

describe('EEDPComponent', () => {
  let component: EEDPComponent;
  let fixture: ComponentFixture<EEDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEDPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EEDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
