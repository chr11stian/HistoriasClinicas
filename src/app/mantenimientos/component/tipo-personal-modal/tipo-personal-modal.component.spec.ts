import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPersonalModalComponent } from './tipo-personal-modal.component';

describe('TipoPersonalModalComponent', () => {
  let component: TipoPersonalModalComponent;
  let fixture: ComponentFixture<TipoPersonalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPersonalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPersonalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
