import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoEtarioComponent } from './grupo-etario.component';

describe('GrupoEtarioComponent', () => {
  let component: GrupoEtarioComponent;
  let fixture: ComponentFixture<GrupoEtarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoEtarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoEtarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
