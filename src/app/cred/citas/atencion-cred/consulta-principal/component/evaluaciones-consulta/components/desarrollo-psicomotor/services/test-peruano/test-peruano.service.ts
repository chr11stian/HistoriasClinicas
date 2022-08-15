import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../../../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TestPeruano {
    base_url = environment.baseUrl;
    bd = environment.bd;
    constructor(private http: HttpClient) { }

    getImagenes() {
        return this.http.get<any>('/assets/data/test-desarollo-img.json')
            .toPromise()
            .then(res => <any[]>res.data)
            .then(data => { return data; });
    }
    getTestPeruano(id) {
        return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/testperuano/${id}`);
    }
    addTestPeruano(id,data){
        return this.http.post(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/testperuano/${id}`,data);
    }
    updatePeruano(id,data) {//no usar
        return this.http.put(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/testperuano/${id}`, data);
    }
    getTestPeruanoPlan(nroDoc){//no lo usa
        return this.http.get(`${this.base_url}/${this.bd}/cred/evaluacion/desarrollo/0/30/meses/listar/${nroDoc}`);
    }
    getUltimoTestPeruanoPorEdad(edad,nroDoc){ /* para K? */
        return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/testperuano/esultimo/${edad}/${nroDoc}`);
    }

}
