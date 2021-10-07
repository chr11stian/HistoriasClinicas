import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RedServiciosSaludService {

    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) { }

    getRedServiciosSalud() {
        return this.http.get(`${this.base_url}/${this.bd}/api/redserviciossalud/red`);
    }

    postRedServiciosSalud(data) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/api/redserviciossalud/red`, data)
    }

    getMicroRedServiciosSalud(idRed) {
        return this.http.get(`${this.base_url}/${this.bd}/api/redserviciossalud/microred/listar/${idRed}`);
    }

    postMicroRedServiciosSalud(idRed, data) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/api/redserviciossalud/microred/${idRed}`, data)
    }

    getEESS(idMicroRed){
        return this.http.get(`${this.base_url}/${this.bd}/api/redserviciossalud/eess/listar/${idMicroRed}`);
    }

    postEESS(idMicroRed, data){
        return this.http.post<any>(`${this.base_url}/${this.bd}/api/redserviciossalud/eess/${idMicroRed}`, data)
    }
}
