import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriaConsultasComponent} from './consultas-general.component';

describe('ConsultasGeneralComponent', () => {
    let component: HistoriaConsultasComponent;
    let fixture: ComponentFixture<HistoriaConsultasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HistoriaConsultasComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoriaConsultasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
