import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsCajaComponent } from './tabs-caja.component';

describe('TabsCajaComponent', () => {
  let component: TabsCajaComponent;
  let fixture: ComponentFixture<TabsCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
