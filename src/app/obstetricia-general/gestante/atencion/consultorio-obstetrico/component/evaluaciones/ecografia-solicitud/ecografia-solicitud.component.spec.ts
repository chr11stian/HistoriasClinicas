import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcografiaSolicitudComponent } from './ecografia-solicitud.component';

describe('EcografiaSolicitudComponent', () => {
  let component: EcografiaSolicitudComponent;
  let fixture: ComponentFixture<EcografiaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcografiaSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcografiaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
