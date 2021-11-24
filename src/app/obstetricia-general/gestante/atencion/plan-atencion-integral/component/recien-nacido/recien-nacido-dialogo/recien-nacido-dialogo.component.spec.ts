import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecienNacidoDialogoComponent } from './recien-nacido-dialogo.component';

describe('RecienNacidoDialogoComponent', () => {
  let component: RecienNacidoDialogoComponent;
  let fixture: ComponentFixture<RecienNacidoDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecienNacidoDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecienNacidoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
