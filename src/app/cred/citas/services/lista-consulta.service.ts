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
    idConsulta: string = ""
    data: any;

    constructor(private http: HttpClient) {
    }

    getConsulta(idConsulta: string) {
        const url = `${this.base_url}/hce/cred/consulta/${idConsulta}`
        return this.http.get(url)
    }

    getConsultasCRED(dni) {
        const url = `${this.base_url}/hce/cred/consulta/all/${dni}`
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

    getDatosGenerales(idConsulta) {
        const url = `${this.base_url}/hce/cred/consulta/datos/generales/${idConsulta}`
        return this.http.get(url)
    }

    //quitar
    getListaConsultaXtipo(tidoDocumento,nroDocumento,tipoConsulta){
        const url = `${this.base_url}/hce/consultageneral/listarXTipo/${tidoDocumento}/${nroDocumento}/${tipoConsulta}`
        return this.http.get(url)
    }
    tieneConsultaDia(tipoDoc:string,nroDoc:string,servicio:string){
        return this.http.get(`${this.base_url}/hce/cred/consulta/existe/${tipoDoc}/${nroDoc}/${servicio}`)
    }
}
