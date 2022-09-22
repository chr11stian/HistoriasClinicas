import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRespuestasComponent } from './dialog-respuestas.component';

describe('DialogRespuestasComponent', () => {
  let component: DialogRespuestasComponent;
  let fixture: ComponentFixture<DialogRespuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRespuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
