import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResultadoImgComponent } from './dialog-resultado-img.component';

describe('DialogResultadoImgComponent', () => {
  let component: DialogResultadoImgComponent;
  let fixture: ComponentFixture<DialogResultadoImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogResultadoImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResultadoImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
