import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautaBreveComponent } from './pauta-breve.component';

describe('PautaBreveComponent', () => {
  let component: PautaBreveComponent;
  let fixture: ComponentFixture<PautaBreveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PautaBreveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PautaBreveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
