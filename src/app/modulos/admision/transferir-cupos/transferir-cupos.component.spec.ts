import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirCuposComponent } from './transferir-cupos.component';

describe('TransferirCuposComponent', () => {
  let component: TransferirCuposComponent;
  let fixture: ComponentFixture<TransferirCuposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferirCuposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferirCuposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
