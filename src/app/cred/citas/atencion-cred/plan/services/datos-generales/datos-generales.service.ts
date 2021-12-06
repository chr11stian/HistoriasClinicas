import {Injectable} from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DatosGeneralesService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    //--id
    tipoDoc: string = "";
    nroDoc: string = "";

    constructor(private http: HttpClient) {
    }
    getDatosGenerales(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/cred/datos/generales/${nroDoc}`)
    }
}
