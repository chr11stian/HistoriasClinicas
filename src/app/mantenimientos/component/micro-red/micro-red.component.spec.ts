import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroRedComponent } from './micro-red.component';

describe('MicroRedComponent', () => {
  let component: MicroRedComponent;
  let fixture: ComponentFixture<MicroRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroRedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
