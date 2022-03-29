import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHisComponent } from './listar-his.component';

describe('ListarHisComponent', () => {
  let component: ListarHisComponent;
  let fixture: ComponentFixture<ListarHisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
