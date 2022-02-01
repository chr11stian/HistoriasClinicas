import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamizajesComponent } from './tamizajes.component';

describe('TamizajesComponent', () => {
  let component: TamizajesComponent;
  let fixture: ComponentFixture<TamizajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamizajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TamizajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
