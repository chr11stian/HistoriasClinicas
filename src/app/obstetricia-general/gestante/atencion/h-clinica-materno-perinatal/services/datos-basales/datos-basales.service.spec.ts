import {TestBed} from '@angular/core/testing';

import {DatosBasalesService} from './datos-basales.service';

describe('DatosBasalesService', () => {
    let service: DatosBasalesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DatosBasalesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
