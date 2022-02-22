import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApiConsulta, DataQuery} from "../atencion-cred/consulta-principal/models/consultaGeneral";

@Injectable({
    providedIn: 'root'
})
export class ListaConsultaService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    tipoDoc: string = "";
    nroDoc: string = "";
    idConsulta: string= ""
    data: any;

    constructor(private http: HttpClient) {
    }

    getConsultasCRED(dni) {
        const url = `${this.base_url}/hce/cred/consulta/all/${dni}`
        return this.http.get(url)
    }

    getConsulta(idConsulta) {
        const url = `${this.base_url}/hce/cred/consulta/${idConsulta}`
        return this.http.get(url)
    }

    crearInterconsulta(dni: string, data) {
        const url = `${this.base_url}/hce/cred/consulta/crear/interconsulta/${dni}`
        return this.http.post(url, data)
    }

    crearConsulta(dni: string, data) {
        const url = `${this.base_url}/hce/cred/consulta/crear/${dni}`
        return this.http.post(url, data)
    }

    getDatosGenerales(idConsulta){
        const url = `${this.base_url}/hce/cred/consulta/datos/generales/${idConsulta}`
        return this.http.get(url)

    }
}
