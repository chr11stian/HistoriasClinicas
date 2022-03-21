import {Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

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

    constructor(private http: HttpClient) {
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