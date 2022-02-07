import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadEjecutoraComponent } from './unidad-ejecutora.component';

describe('UnidadEjecutoraComponent', () => {
  let component: UnidadEjecutoraComponent;
  let fixture: ComponentFixture<UnidadEjecutoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadEjecutoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadEjecutoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
