import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAtencionComponent } from './dialog-atencion.component';

describe('DialogAtencionComponent', () => {
  let component: DialogAtencionComponent;
  let fixture: ComponentFixture<DialogAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
