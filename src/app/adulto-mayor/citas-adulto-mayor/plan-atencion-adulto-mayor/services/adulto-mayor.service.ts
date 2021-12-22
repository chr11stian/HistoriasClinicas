import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AdultoMayorService {
    base_url = environment.baseUrl;
    bd = environment.bd;
    constructor(private http: HttpClient) { }

    getValoracionClinica(idFiliacion){
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/listar/${idFiliacion}`);
    }
    postValoracionClinica(idFiliacion,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/agregar/${idFiliacion}`,data);
    }
    updateValoracionClinica(idFiliacion,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/actualizar/${idFiliacion}`,data);
    }
}

