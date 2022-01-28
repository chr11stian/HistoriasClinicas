import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EedpComponent } from './eedp.component';

describe('EedpComponent', () => {
  let component: EedpComponent;
  let fixture: ComponentFixture<EedpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EedpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EedpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
