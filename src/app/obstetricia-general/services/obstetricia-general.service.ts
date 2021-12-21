import {Injectable, EventEmitter} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ObstetriciaGeneralService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    /**Id, tipoDoc,nroDoc,nroEmbarazo de la Historia clinica materno perinatal: para actualizar el documento**/
    idGestacion: string = "";
    tipoDoc: string = "";
    nroDoc: string = "";
    nroEmbarazo: string = "";
    nroHcl: string;
    data:any;

    /***Id del consultorio obstetrico***/
    idConsultoriObstetrico: string = "";

    constructor(private http: HttpClient) {
    }
    getPacienteFiliacion(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/listarfiliacion/${tipoDoc}/${nroDoc}`)
    }
    getConsultorioObstetrico(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar/`, data)
    }
}
