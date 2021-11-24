import {Injectable, EventEmitter} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ObstetriciaGeneralService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    // observable$ = new EventEmitter<string>();
    //id para recuperar en cada componente
    idGestacion: string = "";

    constructor(private http: HttpClient) {
    }

    getPacienteFiliacion(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/listarfiliacion/${tipoDoc}/${nroDoc}`)
    }
}
