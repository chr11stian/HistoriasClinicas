import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPatologiasMaternasComponent } from './dialog-patologias-maternas.component';

describe('DialogPatologiasMaternasComponent', () => {
  let component: DialogPatologiasMaternasComponent;
  let fixture: ComponentFixture<DialogPatologiasMaternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPatologiasMaternasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPatologiasMaternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
