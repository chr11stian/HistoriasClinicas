import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteconsultaObstetriciaModalComponent } from './inteconsulta-obstetricia-modal.component';

describe('InteconsultaObstetriciaModalComponent', () => {
  let component: InteconsultaObstetriciaModalComponent;
  let fixture: ComponentFixture<InteconsultaObstetriciaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteconsultaObstetriciaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteconsultaObstetriciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
