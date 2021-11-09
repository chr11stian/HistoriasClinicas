import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesAtencionComponent } from './sesiones-atencion.component';

describe('SesionesAtencionComponent', () => {
  let component: SesionesAtencionComponent;
  let fixture: ComponentFixture<SesionesAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionesAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
