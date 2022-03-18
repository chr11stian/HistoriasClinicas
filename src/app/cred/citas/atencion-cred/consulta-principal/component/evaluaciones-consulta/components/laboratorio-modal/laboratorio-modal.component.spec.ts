import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioModalComponent } from './laboratorio-modal.component';

describe('LaboratorioModalComponent', () => {
  let component: LaboratorioModalComponent;
  let fixture: ComponentFixture<LaboratorioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
