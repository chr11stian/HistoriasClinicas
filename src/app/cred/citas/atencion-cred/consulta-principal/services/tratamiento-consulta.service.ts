import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiConsulta, DataQuery } from "../models/consultaGeneral";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class TratamientoConsultaService {
    urlServer = environment.baseUrl;
    urlTx = environment.base_urlTx;
    bd = environment.bd;
    base_url = `${this.urlServer}/${this.bd}/cred/consulta/`;
    headers = new Headers();
    evento: boolean = false;

    constructor(private http: HttpClient) {
        // this.headers.append("Authorization":"B")
    }
    getHIS(idConsulta) {
        return this.http.get(
            `${this.urlServer}/${this.bd}/his/generar/all/his/${idConsulta}`
        );
    }
    addTratamiento(id, data) {
        return this.http.post(
            `${this.urlServer}/${this.bd}/consulta/tratamiento/${id}`,
            data
        );
    }

    updateTratamiento(id, data) {
        return this.http.put(
            `${this.urlServer}/${this.bd}/consulta/tratamiento/${id}`,
            data
        );
    }

    getTratamiento(id) {
        return this.http.get(
            `${this.urlServer}/${this.bd}/consulta/tratamiento/${id}`
        );
    }

    printReceta(idConsulta: any) {
        let username: "reporte";
        let password: "reporte@2022";

        const headers = new HttpHeaders();

        headers.append(
            "Authorization",
            "Basic " + btoa(username + ":" + password)
        );

        const params = new HttpParams({
            fromObject: {
                idConsulta: idConsulta,
            },
        });
        return this.http.get(
            `${this.urlTx}/jasperserver/rest_v2/reports/Reports/RECETA/recetas.pdf`,
            { params, headers }
        );
    }
    /* Acuerdos tratamiento */
    saveAcuerdo(idConsulta, data) {
        return this.http.post(
            `${this.urlServer}/${this.bd}/cred/consulta/acuerdos/${idConsulta}`,
            data
        );
    }
    getListAcuerdo(idConsulta) {
        return this.http.get(
            `${this.urlServer}/${this.bd}/cred/consulta/acuerdos/${idConsulta}`
        );
    }
}
