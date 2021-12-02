import {TestBed} from '@angular/core/testing';

import {RecienNacidoService} from './recien-nacido.service';

describe('RecienNacidoService', () => {
    let service: RecienNacidoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RecienNacidoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
