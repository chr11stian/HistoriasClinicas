import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaVisitasComponent } from './tabla-visitas.component';

describe('TablaVisitasComponent', () => {
  let component: TablaVisitasComponent;
  let fixture: ComponentFixture<TablaVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaVisitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
