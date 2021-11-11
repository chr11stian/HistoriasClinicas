import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecesidadesPartoComponent } from './necesidades-parto.component';

describe('NecesidadesPartoComponent', () => {
  let component: NecesidadesPartoComponent;
  let fixture: ComponentFixture<NecesidadesPartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecesidadesPartoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NecesidadesPartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
