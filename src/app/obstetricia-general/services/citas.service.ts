import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CitasService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {

    }

    getProximaCitasGestacion(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/listarPendientes`, data)
    }

    addCitas(data) {
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/cupo/agregar/citaTentativa`, data)
    }
}
