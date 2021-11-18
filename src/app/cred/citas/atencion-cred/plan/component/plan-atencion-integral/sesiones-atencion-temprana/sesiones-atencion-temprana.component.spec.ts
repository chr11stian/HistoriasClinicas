import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesAtencionTempranaComponent } from './sesiones-atencion-temprana.component';

describe('SesionesAtencionTempranaComponent', () => {
  let component: SesionesAtencionTempranaComponent;
  let fixture: ComponentFixture<SesionesAtencionTempranaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionesAtencionTempranaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesAtencionTempranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
