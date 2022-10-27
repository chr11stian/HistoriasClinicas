import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroPobladoComponent } from './centro-poblado.component';

describe('CentroPobladoComponent', () => {
  let component: CentroPobladoComponent;
  let fixture: ComponentFixture<CentroPobladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroPobladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroPobladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
