import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPeruanoComponent } from './test-peruano.component';

describe('TestPeruanoComponent', () => {
  let component: TestPeruanoComponent;
  let fixture: ComponentFixture<TestPeruanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPeruanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPeruanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
