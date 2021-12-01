import {TestBed} from '@angular/core/testing';

import {FiliancionService} from './filiancion.service';

describe('FiliancionService', () => {
    let service: FiliancionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FiliancionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
