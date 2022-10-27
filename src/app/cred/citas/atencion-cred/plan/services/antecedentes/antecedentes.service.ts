import {Injectable} from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AntecedentesService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    getAntecedentesPersonalesPatologicos(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/antecedentes/${nroDoc}`)
    }

    addAntecedentesPersonalesPatologicos(data) {
        return this.http.post(`${this.base_url}/${this.bd}/antecedentes`, data)
    }
    addAntecedentesFamiliares(data) {
        return this.http.put(`${this.base_url}/${this.bd}/antecedentes/actualizarFam`, data)
    }

    updateAntecedentesPersonalesPatologicos(data) {
        return this.http.put(`${this.base_url}/${this.bd}/antecedentes/actualizarPer`, data)
    }

    getAntecedentesPersonales(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/cred/antecedentes/personales/perinatales/${nroDoc}`)
    }

    updateAntecedentesPersonales(nroDoc, data) {
        return this.http.put(`${this.base_url}/${this.bd}/cred/antecedentes/personales/${nroDoc}`, data)
    }

    addAntecedentesPersonales(nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cred/antecedentes/personales/perinatales/${nroDoc}`, data)
    }
    addAntecedentesPersonales2Update(nroDoc, data) {
        return this.http.put(`${this.base_url}/${this.bd}/cred/antecedentes/personales/perinatales/${nroDoc}`, data)
    }
}
