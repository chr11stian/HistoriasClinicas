import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecendentesComponent } from './antecendentes.component';

describe('AntecendentesComponent', () => {
  let component: AntecendentesComponent;
  let fixture: ComponentFixture<AntecendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecendentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
