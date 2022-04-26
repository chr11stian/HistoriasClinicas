import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LaboratoriosService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {

    }

    getListaLab(idIpres, data) {
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/listar/examen/laboratorio/${idIpres}`, data)
    }
}