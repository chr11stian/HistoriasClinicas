import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry, tap} from "rxjs/operators";
import {Ubicacion} from "../../models/ubicacion.models";

@Injectable({
    providedIn: 'root'
})
export class UbicacionService {

    // private _refresh = new Subject<void>();
    base_url = environment.baseUrl;
    bd = environment.bd;
    private ubicacions: Ubicacion[] = [];
    ubicacion: Ubicacion = null;

    public subjectUser = new BehaviorSubject<Ubicacion>(this.ubicacion);

    constructor(private http: HttpClient) {
    }


    // get refresh() {
    //     return this._refresh;
    // }

    getUbicacion() {
        return this.http.get<Ubicacion[]>(`${this.base_url}/historiasclinicas/ubicacion/listar`)
            .pipe(
                tap((ubicacions) => this.ubicacions = ubicacions)
            )
    }


    getUbicacion1(): Observable<Ubicacion[]> {
        return this.http.get<Ubicacion[]>(`${this.base_url}/historiasclinicas/ubicacion/listar`);
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        console.log(error)
        return throwError('Ubicacion algo salió mal')
    }
}
