import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecienNacidoComponent } from './recien-nacido.component';

describe('RecienNacidoComponent', () => {
  let component: RecienNacidoComponent;
  let fixture: ComponentFixture<RecienNacidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecienNacidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecienNacidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
