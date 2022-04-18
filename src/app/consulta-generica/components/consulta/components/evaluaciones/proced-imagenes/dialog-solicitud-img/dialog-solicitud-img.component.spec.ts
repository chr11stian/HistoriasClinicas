import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSolicitudImgComponent } from './dialog-solicitud-img.component';

describe('DialogSolicitudImgComponent', () => {
  let component: DialogSolicitudImgComponent;
  let fixture: ComponentFixture<DialogSolicitudImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSolicitudImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSolicitudImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
