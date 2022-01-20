import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoUsuarioComponent } from './asegurado-usuario.component';

describe('AseguradoUsuarioComponent', () => {
  let component: AseguradoUsuarioComponent;
  let fixture: ComponentFixture<AseguradoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseguradoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseguradoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
