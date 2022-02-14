import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})


export class EvaluacionAlimentacionService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    /** SERVICIOS EVALUACION ALIMENTICIA**/
    getEvaluacionAlimenticiaCredPlan(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/cred/evaluacion/alimentacion/${nroDoc}`);
    }

    /***SERVICIOS EVALUACION ALIMENTICIA CONSULTA****/
    getEvaluacionAlimenticiaCred(id) {
        return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/alimentacion/${id}`);
    }

    addEvaluacionAlimenticiaCred(id, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/alimentacion/${id}`, data);
    }

    updateEvaluacionAlimenticiaCred(id, data) {
        return this.http.put(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/alimentacion/${id}`, data);
    }

    /*************SERVICIOS DE TAMIZAJES***********/
    addTamizajeCred(id, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cred/ficha-tamizaje/guardar/${id}`, data);

    }
    updateTamizajeCred(data) {
        return this.http.put(`${this.base_url}/${this.bd}/cred/ficha-tamizaje/actualizar`, data);

    }
    getTamizajeCred(id){
        return this.http.get(`${this.base_url}/${this.bd}/cred/ficha-tamizaje/${id}`);

    }
}


