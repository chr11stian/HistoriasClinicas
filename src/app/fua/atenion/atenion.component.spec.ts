import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenionComponent } from './atenion.component';

describe('AtenionComponent', () => {
  let component: AtenionComponent;
  let fixture: ComponentFixture<AtenionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtenionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
