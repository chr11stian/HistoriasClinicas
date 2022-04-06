import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }

  addDiagnostico(idConsulta, data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/agregarDiagnostico/${idConsulta}`, data)
  }

  updateDiagnostico(idConsulta, data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/actualizarDiagnostico/${idConsulta}`, data)
  }

  deleteDiagnostico(idConsulta, cie10SIS) {
    return this.http.delete(`${this.base_url}/${this.bd}/consultageneral/eliminarDiagnostico/${idConsulta}/${cie10SIS}`)
  }

  getDiagnostico(idConsulta) {
    return this.http.get(`${this.base_url}/${this.bd}/consultageneral/listarDiagnostico/${idConsulta}`)
  }

}
