import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FiltroService {

    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(
        private http: HttpClient,
    ) {
    }

    getDepartments() {
        return this.http.get(`${this.base_url}/${this.bd}` + '/api/ubicacion/departamentos', {})
    }

    getProvinces(id: string) {
        return this.http.get(`${this.base_url}/${this.bd}` + '/api/ubicacion/provincias', {})
    }

    getDistritos(id: string) {
        return this.http.get(`${this.base_url}/${this.bd}` + '/api/ubicacion/distritos', {})
    }

    getCentrosPoblados(ubigeo: string) {
        return this.http.get(`${this.base_url}/${this.bd}` + '/api/ubicacion/ccpp', {})
    }
}
