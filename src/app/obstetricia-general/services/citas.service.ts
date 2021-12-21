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

    getProximaCitas(data) {
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/consulta/listarPendientes?pagina=1`, data)
    }

    addCitas(data) {
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/cupo/agregar/citaTentativa`, data)
    }
}
