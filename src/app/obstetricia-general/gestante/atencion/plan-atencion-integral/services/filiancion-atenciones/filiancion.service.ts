import {Injectable} from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FiliancionService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    getPacienteNroDocFiliacion(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarpaciente/${tipoDoc}/${nroDoc}`)
    }
}
