import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPAIComponent } from './calendar-pai.component';

describe('CalendarPAIComponent', () => {
  let component: CalendarPAIComponent;
  let fixture: ComponentFixture<CalendarPAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPAIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
