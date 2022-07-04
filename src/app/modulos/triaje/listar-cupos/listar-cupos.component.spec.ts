import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuposComponent } from './listar-cupos.component';

describe('ListarCuposComponent', () => {
  let component: ListarCuposComponent;
  let fixture: ComponentFixture<ListarCuposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCuposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCuposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
