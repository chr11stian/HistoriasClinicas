import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DatosBasalesService {

    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    getDatosBasalesById(idDatosBasales) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarembarazo/${idDatosBasales}`)
    }

    postDatosBasales(tipoDoc: string, nroDoc: string, data) {
        return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarembarazo/${tipoDoc}/${nroDoc}`, data)
    }

    postDatosBasalesById(idGestacion: string, data) {
        return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarembarazo/${idGestacion}`, data)
    }
    getFactorDeCorreccion(idIpress: string) {
        return this.http.get(`${this.base_url}/${this.bd}/ajusteHemoglobina/buscar/${idIpress}`)
    }

    postPromiseDatosBasalesById(idGestacion: string, data) {
        return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarembarazo/${idGestacion}`, data)
            .toPromise()
            .then(res => <any>res)
            .then(data => { return data; })
            .catch(error => { return error.error });
    }
}
