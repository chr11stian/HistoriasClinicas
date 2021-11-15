import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObstetriciaComponent } from './obstetricia.component';

describe('ObstetriciaComponent', () => {
  let component: ObstetriciaComponent;
  let fixture: ComponentFixture<ObstetriciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObstetriciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObstetriciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
