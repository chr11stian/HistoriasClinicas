import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedImagenesComponent } from './proced-imagenes.component';

describe('ProcedImagenesComponent', () => {
  let component: ProcedImagenesComponent;
  let fixture: ComponentFixture<ProcedImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedImagenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
