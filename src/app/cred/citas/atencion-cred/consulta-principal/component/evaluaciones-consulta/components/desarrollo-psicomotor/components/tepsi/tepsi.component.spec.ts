import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TepsiComponent } from './tepsi.component';

describe('TepsiComponent', () => {
  let component: TepsiComponent;
  let fixture: ComponentFixture<TepsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TepsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TepsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
