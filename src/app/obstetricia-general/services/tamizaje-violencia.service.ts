import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TamizajeViolenciaService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {

    }

    addTamizajeViolencia(data) {
        return this.http.post(`${this.base_url}/${this.bd}/fichaTamizajeVBG/agregar`, data)
    }

    UpdateTamizajeViolencia(idTamizaje, data) {
        return this.http.put(`${this.base_url}/${this.bd}/fichaTamizajeVBG/actualizar/${idTamizaje}`, data)
    }

    UpdateTamizajeCuestionario(idTamizaje, data) {
        return this.http.put(`${this.base_url}/${this.bd}/fichaTamizajeVBG/actualizarCuestionarioPosibleViolencia/${idTamizaje}`, data)
    }

    UpdateTamizajeValorRiesgo(idTamizaje, data) {
        return this.http.put(`${this.base_url}/${this.bd}/fichaTamizajeVBG/actualizarFichaValoracionRiesgo/${idTamizaje}`, data)
    }

    GetTamizajeViolenciaNroDoc(data) {
        return this.http.post(`${this.base_url}/${this.bd}/fichaTamizajeVBG/buscar`, data)
    }

    GetTamizajePorIDConsulta(idConsulta) {
        return this.http.get(`${this.base_url}/${this.bd}/fichaTamizajeVBG/consulta/${idConsulta}`)
    }

    GetTamizajeViolenciaNroHcl(nroHcl) {
        return this.http.get(`${this.base_url}/${this.bd}/fichaTamizajeVBG/buscarHcl/${nroHcl}`)
    }

    postSaveViolenceScreening(idConsulta: string, data) {
        return this.http.post(`${this.base_url}/${this.bd}/fichaTamizajeVBG/actualizarCuestionarioPosibleViolencia/consulta/${idConsulta}`, data)
            .toPromise()
            .then(res => res)
            .then(data => { return data; })
    }
}
