import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraEvaGnrlComponent } from './cabecera-eva-gnrl.component';

describe('CabeceraEvaGnrlComponent', () => {
  let component: CabeceraEvaGnrlComponent;
  let fixture: ComponentFixture<CabeceraEvaGnrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabeceraEvaGnrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraEvaGnrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
