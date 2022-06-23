import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpressLaboratorioComponent } from './ipress-laboratorio.component';

describe('IpressLaboratorioComponent', () => {
  let component: IpressLaboratorioComponent;
  let fixture: ComponentFixture<IpressLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpressLaboratorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpressLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
