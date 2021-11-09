import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedServiciosSaludComponent } from './red-servicios-salud.component';

describe('RedServiciosSaludComponent', () => {
  let component: RedServiciosSaludComponent;
  let fixture: ComponentFixture<RedServiciosSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedServiciosSaludComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedServiciosSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
