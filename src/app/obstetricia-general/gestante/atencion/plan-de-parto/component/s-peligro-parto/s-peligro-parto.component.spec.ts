import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPeligroPartoComponent } from './s-peligro-parto.component';

describe('SPeligroPartoComponent', () => {
  let component: SPeligroPartoComponent;
  let fixture: ComponentFixture<SPeligroPartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SPeligroPartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SPeligroPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
