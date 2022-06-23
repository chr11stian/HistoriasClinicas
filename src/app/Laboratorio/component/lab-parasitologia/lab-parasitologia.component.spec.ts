import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabParasitologiaComponent } from './lab-parasitologia.component';

describe('LabParasitologiaComponent', () => {
  let component: LabParasitologiaComponent;
  let fixture: ComponentFixture<LabParasitologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabParasitologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabParasitologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
