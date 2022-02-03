import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressHorariosComponent } from './ipress-horarios.component';

describe('IpressHorariosComponent', () => {
  let component: IpressHorariosComponent;
  let fixture: ComponentFixture<IpressHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
