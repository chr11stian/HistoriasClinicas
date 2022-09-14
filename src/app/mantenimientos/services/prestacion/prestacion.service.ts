import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrestacionService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }
  getPrestacion() {
    return this.http.get(`${this.base_url}/${this.bd}/sis/prestacion/listar`);
  }
  postPrestacion(inputRequest) {
    return this.http.post(`${this.base_url}/${this.bd}/sis/prestacion/guardar`, inputRequest);
  }
  putPrestacion(codigo, inputRequest) {
    return this.http.put(`${this.base_url}/${this.bd}/sis/prestacion/update/${codigo}`, inputRequest);
  }

  getDiagnosticoPorCodigo(codigo: string) {
    return this.http.get(`${this.base_url}/${this.bd}/sis/prestacion/listar/por/codigo/${codigo}`);
  }
  postDiagnosticoPorCodigo(codigo: string, inputRequest) {
    return this.http.post(`${this.base_url}/${this.bd}/sis/prestacion/guardar/diagnostico/${codigo}`, inputRequest);
  }
  putDiagnosticoPorCodigo(codigo: string, cie10: string, inputRequest) {
    return this.http.put(`${this.base_url}/${this.bd}/sis/prestacion/update/diagnostico/${codigo}/${cie10}`, inputRequest);
  }
  desactivarDiagnostico(codigo: string, cie10: string) {
    return this.http.get(`${this.base_url}/${this.bd}/sis/prestacion/desactivar/${codigo}/${cie10}`);
  }
  activarDiagnostico(codigo: string, cie10: string) {
    return this.http.get(`${this.base_url}/${this.bd}/sis/activar/diagnostico/${codigo}/${cie10}`);
  }
  // procedimiento
  getProcedimientoPorCodigo(codigo: string) {
    return this.http.get(`${this.base_url}/${this.bd}/sis/prestacion/listar/procedimientos/${codigo}`);
  }
  postProcedimientoPorCodigo(codigo: string, inputRequest) {
    return this.http.post(`${this.base_url}/${this.bd}/sis/prestacion/guardar/procedimiento/${codigo}`, inputRequest);
  }
  putProcedimientoPorCodigo(codigo: string, codPres: string, inputRequest) {
    return this.http.put(`${this.base_url}/${this.bd}/sis/prestacion/update/procedimeinto/${codigo}/${codPres}`, inputRequest);
  }

  getPromiseDiagnosticoPorCodigo(codigo: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/sis/prestacion/listar/por/codigo/${codigo}`)
      .toPromise()
      .then(res => res.object)
      .then(data => { return data })
      .catch(error => { return error.error })
  }
  //denominacion: ANIOS, MESES, HORAS, DIAS
  //AMBOS, MUJER, VARON

}
