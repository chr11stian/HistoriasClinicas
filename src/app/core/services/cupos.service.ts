import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CuposService {
    // base_url = environment.baseUrl;
    // bd = environment.bd;

    base_urlSimular = environment.baseUrlSimular;

    constructor(private http: HttpClient) {
    }

    getOferta(id) {
        return this.http.get(`${this.base_urlSimular}/Oferta/${id}`);
    }

    getServicios() {
        return this.http.get(`${this.base_urlSimular}/Servicios`);
    }

    getPersonal() {
        return this.http.get(`${this.base_urlSimular}/Personal`);
    }

    getHoraAtencion() {
        return this.http.get(`${this.base_urlSimular}/Horario_Atencion`);
    }
}
