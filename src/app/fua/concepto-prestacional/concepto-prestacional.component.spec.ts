import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoPrestacionalComponent } from './concepto-prestacional.component';

describe('ConceptoPrestacionalComponent', () => {
  let component: ConceptoPrestacionalComponent;
  let fixture: ComponentFixture<ConceptoPrestacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoPrestacionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptoPrestacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
