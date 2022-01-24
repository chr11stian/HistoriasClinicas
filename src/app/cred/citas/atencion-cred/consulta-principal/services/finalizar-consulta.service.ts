import {Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FinalizarConsultaService {
    urlServer = environment.baseUrl
    bd = environment.bd

    constructor(private http: HttpClient) {
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