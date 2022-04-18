import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoConsultaComponent } from './motivo-consulta.component';

describe('MotivoConsultaComponent', () => {
  let component: MotivoConsultaComponent;
  let fixture: ComponentFixture<MotivoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivoConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
