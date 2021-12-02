import { Injectable } from '@angular/core';
import { environment } from "../../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ConsultasService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    addConsultas(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarConsultorio`, data)
    }

    updateConsultas(data) {
        return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarConsultorio`, data);
    }

    getConsultaPrenatalByEmbarazo(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar`, data);
    }

    getInterrogatorioByEmbarazo(data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscarInterrogatorio`, data);
    }
}
