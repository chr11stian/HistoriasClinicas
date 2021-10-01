import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry, tap } from "rxjs/operators";
import { Departamentos, Provincias, Ubicacion } from "../../../core/models/ubicacion.models";
import { Personal } from "../../../core/models/personal.models";

@Injectable({
    providedIn: "root",
})
export class UbicacionService {
    // private _refresh = new Subject<void>();
    base_url = environment.baseUrl;
    bd = environment.bd;


    constructor(private http: HttpClient) {
    }

    // get refresh() {
    //     return this._refresh;
    // }


    getUbicacion() {
        return this.http.get(`${this.base_url}/${this.bd}/api/ubicacion/listar?page=1`);
    }


    getDepartamentos() {
        return this.http.get(`${this.base_url}/${this.bd}/api/ubicacion/departamentos`);
    }

    getProvincias(data) {
        return this.http.post(`${this.base_url}/${this.bd}/api/ubicacion/provincias`, data);
    }

    getDistritos(data){
        return this.http.post(`${this.base_url}/${this.bd}/api/ubicacion/distritos`, data);
    }
    
}
