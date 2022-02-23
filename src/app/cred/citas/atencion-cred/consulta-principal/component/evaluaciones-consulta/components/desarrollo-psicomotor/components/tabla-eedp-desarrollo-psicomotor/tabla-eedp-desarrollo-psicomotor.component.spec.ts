import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEedpDesarrolloPsicomotorComponent } from './tabla-eedp-desarrollo-psicomotor.component';

describe('TablaEedpDesarrolloPsicomotorComponent', () => {
  let component: TablaEedpDesarrolloPsicomotorComponent;
  let fixture: ComponentFixture<TablaEedpDesarrolloPsicomotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEedpDesarrolloPsicomotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEedpDesarrolloPsicomotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
