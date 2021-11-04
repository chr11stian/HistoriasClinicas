import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CuposService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    // base_urlSimular = environment.baseUrlSimular;

    constructor(private http: HttpClient) {
    }


    getOfertas(data) {
        return this.http.post(`${this.base_url}/${this.bd}/api/oferta/oferta`, data)
    }

    getTipoUPSs() {
        return this.http.get(`${this.base_url}/${this.bd}/api/tipoups/listar`);
    }

    getOfertasListar(data) {
        return this.http.post(`${this.base_url}/${this.bd}/api/oferta/listar`, data)
    }

    saveCupos(data) {
        return this.http.post(`${this.base_url}/${this.bd}/api/cupo/save`, data)
    }

    getCuposServicioFecha(data) {
        return this.http.post(`${this.base_url}/${this.bd}/api/cupo/find/servicio`, data)
    }
}
