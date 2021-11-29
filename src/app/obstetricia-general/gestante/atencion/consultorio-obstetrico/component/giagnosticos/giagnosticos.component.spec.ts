import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiagnosticosComponent } from './giagnosticos.component';

describe('GiagnosticosComponent', () => {
  let component: GiagnosticosComponent;
  let fixture: ComponentFixture<GiagnosticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiagnosticosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiagnosticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
