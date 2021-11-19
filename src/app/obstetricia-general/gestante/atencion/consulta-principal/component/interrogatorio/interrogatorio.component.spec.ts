import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrogatorioComponent } from './interrogatorio.component';

describe('InterrogatorioComponent', () => {
  let component: InterrogatorioComponent;
  let fixture: ComponentFixture<InterrogatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterrogatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterrogatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
