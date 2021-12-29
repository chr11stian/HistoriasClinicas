import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SRefiereContrarefiereComponent } from './s-refiere-contrarefiere.component';

describe('SRefiereContrarefiereComponent', () => {
  let component: SRefiereContrarefiereComponent;
  let fixture: ComponentFixture<SRefiereContrarefiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SRefiereContrarefiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SRefiereContrarefiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
