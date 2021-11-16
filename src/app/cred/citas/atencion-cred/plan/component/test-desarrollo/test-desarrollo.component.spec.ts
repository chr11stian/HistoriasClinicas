import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDesarrolloComponent } from './test-desarrollo.component';

describe('TestDesarrolloComponent', () => {
  let component: TestDesarrolloComponent;
  let fixture: ComponentFixture<TestDesarrolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDesarrolloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDesarrolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
