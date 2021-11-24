import {Injectable, EventEmitter} from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";

@Injectable({
    providedIn: 'root'
})
export class FiliancionService {
    base_url = environment.baseUrl;
    bd = environment.bd;
    id:string ="";


    constructor(private http: HttpClient) {
    }
    getPacienteNroDocFiliacion(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarpaciente/${tipoDoc}/${nroDoc}`)
    }

    addPacienteFiliacion(tipoDoc, nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarafiliacion/${tipoDoc}/${nroDoc}`, data)
    }

}
