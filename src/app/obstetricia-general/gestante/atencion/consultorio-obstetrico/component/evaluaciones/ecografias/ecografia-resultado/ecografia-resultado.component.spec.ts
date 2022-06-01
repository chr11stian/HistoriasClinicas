import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcografiaResultadoComponent } from './ecografia-resultado.component';

describe('EcografiaResultadoComponent', () => {
  let component: EcografiaResultadoComponent;
  let fixture: ComponentFixture<EcografiaResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcografiaResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcografiaResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
