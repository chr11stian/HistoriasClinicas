import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionComponent } from './prestacion.component';

describe('PrestacionComponent', () => {
  let component: PrestacionComponent;
  let fixture: ComponentFixture<PrestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
