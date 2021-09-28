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

    // private baseUrl: string = environment.baseUrl;

    base_url = environment.baseUrl;
    private personales: Personal[] = [];



    constructor(private http: HttpClient) {
    }

    get refresh() {
        return this._refresh;
    }

    // getPersonals() {
    //     return this.http.get<Personal[]>(`${this.base_url}/historiasclinicas/api/personal`)
    //         .pipe(
    //             tap((personales) => this.personales = personales)
    //         )
    // }


    getPersonal(): Observable<Personal[]> {
        return this.http.get<Personal[]>(`${this.base_url}/historiasclinicas/api/listarpersonal`);
    }

    agregarPersonal(personal: Personal): Observable<Personal> {
        return this.http.post<Personal>(`${this.base_url}/historiasclinicas/api/listarpersonal`, personal)
            .pipe(
                tap(() => {
                    this._refresh.next();
                })
            )
    }


    actualizarPersonal(personal: Personal): Observable<Personal> {
        return this.http.put<Personal>(`${this.base_url}/personal/${personal.id}`, personal)
            .pipe(
                tap(() => {
                    this._refresh.next();
                })
            )
    }

    getPersonalPorId(id: string): Observable<Personal> {
        return this.http.get<Personal>(`${this.base_url}/personal/${id}`);
    }

    borrarPersoal(id: string): Observable<any> {
        return this.http.delete<any>(`${this.base_url}/personal/${id}`);
    }
}
