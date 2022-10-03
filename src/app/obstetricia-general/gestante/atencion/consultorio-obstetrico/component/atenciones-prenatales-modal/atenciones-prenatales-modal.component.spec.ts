import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionesPrenatalesModalComponent } from './atenciones-prenatales-modal.component';

describe('AtencionesPrenatalesModalComponent', () => {
  let component: AtencionesPrenatalesModalComponent;
  let fixture: ComponentFixture<AtencionesPrenatalesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionesPrenatalesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionesPrenatalesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
