import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuerperioComponent } from './puerperio.component';

describe('PuerperioComponent', () => {
  let component: PuerperioComponent;
  let fixture: ComponentFixture<PuerperioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuerperioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuerperioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
