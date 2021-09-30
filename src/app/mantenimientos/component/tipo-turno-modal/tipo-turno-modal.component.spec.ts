import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTurnoModalComponent } from './tipo-turno-modal.component';

describe('TipoTurnoModalComponent', () => {
  let component: TipoTurnoModalComponent;
  let fixture: ComponentFixture<TipoTurnoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTurnoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTurnoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
