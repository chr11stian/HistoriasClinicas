import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOfertasComponent } from './generar-ofertas.component';

describe('GenerarOfertasComponent', () => {
  let component: GenerarOfertasComponent;
  let fixture: ComponentFixture<GenerarOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarOfertasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
