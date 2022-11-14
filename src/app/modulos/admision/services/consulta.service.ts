import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

@Injectable({
    providedIn: "root",
})
export class ConsultaService {
    base_url = environment.baseUrl;
    bd = environment.bd;
    constructor(private http: HttpClient) {}
    listConsulta(nroDoc: string) {
        return this.http.get(
            `${this.base_url}/${this.bd}/obstetricia/consulta/listaconsultas/admin/hoy/${nroDoc}`
        );
    }

    updateConsulta(idConsulta: string) {
        return this.http.put(
            `${this.base_url}/${this.bd}/obstetricia/consulta/abrirconsulta/solo/hoy/${idConsulta}`,
            ""
        );
    }

    listConsultaLab(nroDoc: string, body) {
        return this.http.post(
            `${this.base_url}/${this.bd}/his/admin/${nroDoc}`,
            body
        );
    }
    
    updateConsultaLab(his: string, cie10: string, tipoDx: string, lab: string) {
        return this.http.get(
            `${this.base_url}/${this.bd}/his/admin/${his}/${cie10}/${tipoDx}/${lab}`
        );
    }
}
