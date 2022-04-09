import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReqLaboratorioComponent } from './dialog-req-laboratorio.component';

describe('DialogReqLaboratorioComponent', () => {
  let component: DialogReqLaboratorioComponent;
  let fixture: ComponentFixture<DialogReqLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReqLaboratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReqLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
