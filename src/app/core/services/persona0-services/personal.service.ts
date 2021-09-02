import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


import {Personal} from '../../../core/models/personal.models';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PersonalService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    getPersonal(): Observable<Personal[]> {
        return this.http.get<Personal[]>(`${this.baseUrl}/personal`);
    }
}
