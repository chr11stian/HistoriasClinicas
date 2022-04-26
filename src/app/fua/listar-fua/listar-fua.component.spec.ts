import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFuaComponent } from './listar-fua.component';

describe('ListarFuaComponent', () => {
  let component: ListarFuaComponent;
  let fixture: ComponentFixture<ListarFuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
