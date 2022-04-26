import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddExamenesAuxiliaresComponent } from './dialog-add-examenes-auxiliares.component';

describe('DialogAddExamenesAuxiliaresComponent', () => {
  let component: DialogAddExamenesAuxiliaresComponent;
  let fixture: ComponentFixture<DialogAddExamenesAuxiliaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddExamenesAuxiliaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddExamenesAuxiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
