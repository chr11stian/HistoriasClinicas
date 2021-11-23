import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultaUniversalComponent } from './dialog-consulta-universal.component';

describe('DialogConsultaUniversalComponent', () => {
  let component: DialogConsultaUniversalComponent;
  let fixture: ComponentFixture<DialogConsultaUniversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsultaUniversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultaUniversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
