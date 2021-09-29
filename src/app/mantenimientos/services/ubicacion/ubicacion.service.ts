import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry, tap} from "rxjs/operators";
import {Departamentos, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
import {Personal} from "../../../core/models/personal.models";

@Injectable({
    providedIn: "root",
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

    // getUbicacion(): Observable<Ubicacion[]> {
    //     return this.http.get<Ubicacion[]>(`${this.base_url}/historiasclinicas/ubicacion/listar`);
    // }

    // get refresh() {
    //     return this._refresh;
    // }

    getUbicacion(): Observable<Ubicacion[]> {
        return this.http.get<Ubicacion[]>(`${this.base_url}/historiasclinicas/api/ubicacion/listar?page=1`);
    }

    getUbicacionUbigeo(ubigeo: string) {
        return this.http.get<Ubicacion[]>(`${this.base_url}/historiasclinicas/api/ubicacion/ubigeo/${ubigeo}`);
    }

    getDepartamentos(): Observable<Departamentos[]> {
        return this.http.get<Departamentos[]>(`${this.base_url}/historiasclinicas/api/ubicacion/departamentos`);

    }


    getProvincia(iddd) {
        return this.http.get<any>(`${this.base_url}/${this.bd}/api/ubicacion/provincias`, iddd)
    }


    getProvinciasId(id: string): Observable<Provincias> {
        return this.http.get<Provincias>(`${this.base_url}/historiasclinicas/api/ubicacion/provincias/${id}`);
    }


    agregarPersonal(ubicacion: Ubicacion): Observable<Personal> {
        return this.http.post<Personal>(`${this.base_url}/historiasclinicas/api/save/cpp`, ubicacion)
    }


    private handleError(error: HttpErrorResponse): Observable<any> {
        console.log(error);
        return throwError("Ubicacion algo salió mal");
    }
}
