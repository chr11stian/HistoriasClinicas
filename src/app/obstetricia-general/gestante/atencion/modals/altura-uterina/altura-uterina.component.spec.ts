import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlturaUterinaComponent } from './altura-uterina.component';

describe('AlturaUterinaComponent', () => {
  let component: AlturaUterinaComponent;
  let fixture: ComponentFixture<AlturaUterinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlturaUterinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlturaUterinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
