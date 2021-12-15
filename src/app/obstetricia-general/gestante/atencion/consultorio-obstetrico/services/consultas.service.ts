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

    getConsultas(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar`, data)
    }

    addConsultas(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarConsultorio`, data)
    }

    updateConsultas(data) {
        return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarConsultorio`, data);
    }
    updateConsultas2(data,nroFetos) {
        return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarConsultorio/${nroFetos}`, data);
    }
    getConsultaPrenatalByEmbarazo(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar/`, data);
    }
    getInterrogatorioByEmbarazo(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscarInterrogatorio`, data);
    }

    getUltimaConsultaById(idConsulta) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/numeroUltimaConsultaxid`, idConsulta)
    }
    getLastConsulById(idConsulta) {
        const promise = this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/numeroUltimaConsultaxid`, idConsulta).toPromise();
        promise.then((data) => {
            console.log("Promise resolved with: " + JSON.stringify(data));
        }).catch((error) => {
            console.log("Promise rejected with " + JSON.stringify(error));
        })
        return promise;
    }

    getInterrogatorioById(consulta) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscarInterrogatorioxid`, consulta)
    }
}
