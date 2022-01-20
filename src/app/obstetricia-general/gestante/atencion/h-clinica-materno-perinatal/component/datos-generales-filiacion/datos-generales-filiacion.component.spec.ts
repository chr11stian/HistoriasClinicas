import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatosGeneralesFiliacionComponent} from './datos-generales-filiacion.component';

describe('DatosGeneralesFiliacionComponent', () => {
    let component: DatosGeneralesFiliacionComponent;
    let fixture: ComponentFixture<DatosGeneralesFiliacionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatosGeneralesFiliacionComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DatosGeneralesFiliacionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
