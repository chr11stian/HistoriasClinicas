import {Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {referencia} from "../../../models/data";


interface event {
    title: string,
    start: string | Date
}

@Injectable({
    providedIn: 'root'
})
export class FinalizarConsultaService {
    urlServer = environment.baseUrl
    bd = environment.bd
    list: event[] = []
    referencia: referencia

    constructor(private http: HttpClient) {
    }

    addAcuerdo(id, data) {
        return this.http.post(`${this.urlServer}/${this.bd}/cred/consulta/acuerdos/${id}`, data)
    }

    buscarIprees(item: string) {
        return this.http.get(`${this.urlServer}/${this.bd}/ipress/filtro/${item}`)
    }

    consultaReferencia(idConsulta: string) {
        return this.http.get(`${this.urlServer}/${this.bd}/referencia/datosConsulta/${idConsulta}`)
    }

    listPlan(nroDoc: string) {
        return this.http.get(`${this.urlServer}/${this.bd}/cred/recuperardatos/${nroDoc}`)
    }

    searchLaboratorio(idConsulta) {
        return this.http.get(`${this.urlServer}/${this.bd}/examenesAuxiliares/buscar/id/consulta/${idConsulta}`)
    }

    addReference(id, data) {
        return this.http.post(`${this.urlServer}/${this.bd}/referencia/${id}`, data)
    }

    addFinalizar(id, data) {
        return this.http.put(`${this.urlServer}/${this.bd}/cred/consulta/finconsulta/${id}`, data)
    }

    updateFinalizar(id, data) {
        return this.http.post(`${this.urlServer}/${this.bd}/cred/consulta/finconsulta/${id}`, data)
    }

    getFinalizar(id) {
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/finconsulta/${id}`)
    }
}