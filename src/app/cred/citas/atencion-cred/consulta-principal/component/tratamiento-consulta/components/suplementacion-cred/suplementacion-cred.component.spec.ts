import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplementacionCredComponent } from './suplementacion-cred.component';

describe('SuplementacionCredComponent', () => {
  let component: SuplementacionCredComponent;
  let fixture: ComponentFixture<SuplementacionCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplementacionCredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplementacionCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
