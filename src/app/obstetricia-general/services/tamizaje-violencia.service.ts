import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TamizajeViolenciaService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {

    }

    addTamizajeViolencia(data) {
        return this.http.post(`${this.base_url}/${this.bd}/fichaTamizajeVBG/agregar`, data)
    }

    UpdateTamizajeViolencia(data) {
        return this.http.put(`${this.base_url}/${this.bd}/fichaTamizajeVBG/actualizar`, data)
    }

    GetTamizajeViolenciaNroDoc(data) {
        return this.http.post(`${this.base_url}/${this.bd}/fichaTamizajeVBG/buscar`, data)
    }

    GetTamizajeViolenciaNroHcl(nroHcl) {
        return this.http.get(`${this.base_url}/${this.bd}/fichaTamizajeVBG/buscarHcl/${nroHcl}`)
    }
}