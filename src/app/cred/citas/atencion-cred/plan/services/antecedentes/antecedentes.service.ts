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

    getAntecedentesPersonales(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/cred/antecedentes/personales/${nroDoc}`)
    }

    updateAntecedentesPersonales(nroDoc, data) {
        return this.http.put(`${this.base_url}/${this.bd}/cred/antecedentes/personales/${nroDoc}`, data)
    }

    addAntecedentesPersonales(nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cred/antecedentes/personales/${nroDoc}`, data)
    }
}
