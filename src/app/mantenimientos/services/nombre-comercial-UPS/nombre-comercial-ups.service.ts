import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NombreComercialUPSService {

    // private _refresh = new Subject<void>();
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    // get refresh() {
    //     return this._refresh;
    // }

    getNombreComercial_UPS() {
        return this.http.get(`${this.base_url}/${this.bd}/nc-ups/listar`);
    }

    createNombreComercial_UPS(data) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/nc-ups/save`, data)
    }

    deleteNombreComercial_UPS(id) {
        return this.http.delete(`${this.base_url}/${this.bd}/nc-ups/${id}`)
    }

    editNombreComercial_UPS(id, data) {
        return this.http.put(`${this.base_url}/${this.bd}/nc-ups/actualizar/${id}`, data)
    }
}
