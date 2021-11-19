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
        return this.http.get(`${this.base_url}/${this.bd}/redserviciossalud/red`);
    }

    postRedServiciosSalud(data) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/redserviciossalud/red`, data)
    }

    getMicroRedServiciosSalud(idRed) {
        return this.http.get(`${this.base_url}/${this.bd}/redserviciossalud/microred/listar/${idRed}`);
    }

    postMicroRedServiciosSalud(idRed, data) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/redserviciossalud/microred/${idRed}`, data)
    }

    getEESS(idMicroRed) {
        return this.http.get(`${this.base_url}/${this.bd}/redserviciossalud/eess/listar/${idMicroRed}`);
    }

    postEESS(idMicroRed, data) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/redserviciossalud/eess/${idMicroRed}`, data)
    }

    putRed(data) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/redserviciossalud/red`, data)
    }

    putMicroRed(data) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/redserviciossalud/microred`, data)
    }

    putEESS(data) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/redserviciossalud/eess`, data)
    }

    deleteEESS(idEESS) {
        return this.http.delete<any>(`${this.base_url}/${this.bd}/redserviciossalud/eess/${idEESS}`)
    }

    getRedByIdRed(idRed) {
        return this.http.get<any>(`${this.base_url}/${this.bd}/redserviciossalud/red${idRed}`)
    }

    getMicroRedByIdMicroRed(idMicroRed) {
        return this.http.get(`${this.base_url}/${this.bd}/redserviciossalud/microred/${idMicroRed}`)
    }

    getEESSByIdEESS(idEESS){
        return this.http.get(`${this.base_url}/${this.bd}/redserviciosalud/eess/${idEESS}`)
    }
}
