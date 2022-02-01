import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolloPsicomotorComponent } from './desarrollo-psicomotor.component';

describe('DesarrolloPsicomotorComponent', () => {
  let component: DesarrolloPsicomotorComponent;
  let fixture: ComponentFixture<DesarrolloPsicomotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesarrolloPsicomotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrolloPsicomotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
