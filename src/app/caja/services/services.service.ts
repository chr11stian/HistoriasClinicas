import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {

    }

    getListaPendientesDePago(idIpres, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cupo/caja/${idIpres}`, data)
    }
}
