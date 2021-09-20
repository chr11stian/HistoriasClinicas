import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Personal} from '../../../core/models/personal.models';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PersonalService {

    private _refresh = new Subject<void>();

    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    get refresh() {
        return this._refresh;
    }

    getPersonal(): Observable<Personal[]> {
        return this.http.get<Personal[]>(`${this.baseUrl}/personal`);
    }

    agregarPersonal(personal: Personal): Observable<Personal> {
        return this.http.post<Personal>(`${this.baseUrl}/personal`, personal)
            .pipe(
                tap(() => {
                    this._refresh.next();
                })
            )
    }


    actualizarPersonal(personal: Personal): Observable<Personal> {
        return this.http.put<Personal>(`${this.baseUrl}/personal/${personal.id}`, personal)
            .pipe(
                tap(() => {
                    this._refresh.next();
                })
            )
    }

    getPersonalPorId(id: string): Observable<Personal> {
        return this.http.get<Personal>(`${this.baseUrl}/personal/${id}`);
    }

    borrarPersoal(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/personal/${id}`);
    }
}
