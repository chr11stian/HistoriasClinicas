import {Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MotivosConsultaService {
    urlServer = environment.baseUrl
    bd = environment.bd

    constructor(private http: HttpClient) {
    }

    addMotivos(id, data) {
        return this.http.put(`${this.urlServer}/${this.bd}/cred/consulta/motivos/${id}`, data)
    }

    updateMotivos(id, data) {
        return this.http.post(`${this.urlServer}/${this.bd}/cred/consulta/agregar/motivo/${id}`, data)
    }

    getMotivos(idConsulta) {
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/motivo/${idConsulta}`)
    }
}

