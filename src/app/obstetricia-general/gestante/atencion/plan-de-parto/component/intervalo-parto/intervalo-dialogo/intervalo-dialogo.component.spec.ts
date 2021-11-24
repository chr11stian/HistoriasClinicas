import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervaloDialogoComponent } from './intervalo-dialogo.component';

describe('IntervaloDialogoComponent', () => {
  let component: IntervaloDialogoComponent;
  let fixture: ComponentFixture<IntervaloDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervaloDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervaloDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
