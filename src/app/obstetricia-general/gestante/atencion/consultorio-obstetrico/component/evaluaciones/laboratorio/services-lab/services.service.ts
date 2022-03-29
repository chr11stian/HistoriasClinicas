import {Injectable} from '@angular/core';
import {environment} from "../../../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    addSolicitudLab(idConsulta, data) {
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/crear-Laboratorios/${idConsulta}`, data)
    }

    getLab() {
        return this.http.get(`${this.base_url}/${this.bd}/tools/laboratorios`)
    }
}
