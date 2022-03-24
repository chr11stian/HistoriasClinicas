import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcografiasComponent } from './ecografias.component';

describe('EcografiasComponent', () => {
  let component: EcografiasComponent;
  let fixture: ComponentFixture<EcografiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcografiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcografiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
