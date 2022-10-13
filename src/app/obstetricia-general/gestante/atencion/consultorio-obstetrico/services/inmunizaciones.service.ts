import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class InmunizacionesService {
    base_url = environment.baseUrl;
    bd = environment.bd;
    constructor(private http: HttpClient) {}

    saveSolicitudInmunizacion(body) {
        return this.http.post(
            `${this.base_url}/${this.bd}/inmunizacion/registrar/solicitud`,
            body
        );
    }
    getSolicitudInmunizaciones(dni) {
        return this.http.get(
            `${this.base_url}/${this.bd}/inmunizacion/solicitud/DNI/${dni}`
        );
    }
    getListInmunizaciones() {
        return this.http.get(
            `${this.base_url}/${this.bd}/inmunizacion/solicitud`
        );
    }
    saveListInmunizaciones(body) {
        return this.http.put(
            `${this.base_url}/${this.bd}/inmunizacion/guardar`,
            body
        );
    }
    deleteInmunizacion(idInmunizacion) {
        return this.http.put(
            `${this.base_url}/${this.bd}/inmunizacion/delete/${idInmunizacion}`,
            null
        );
    }
}
