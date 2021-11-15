import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasGeneralComponent } from './consultas-general.component';

describe('ConsultasGeneralComponent', () => {
  let component: ConsultasGeneralComponent;
  let fixture: ComponentFixture<ConsultasGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
