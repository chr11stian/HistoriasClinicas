import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

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
    return this.http.post(`${this.base_url}/${this.bd}/sis/prestacion/guardar`,inputRequest);
  }
  putPrestacion(codigo,inputRequest) {
    return this.http.put(`${this.base_url}/${this.bd}/sis/prestacion/update/${codigo}`,inputRequest);
  }
  getDiagnosticoPorCodigo(codigo:string) {
    return this.http.get(`${this.base_url}/${this.bd}/sis/prestacion/listar/por/codigo/${codigo}`);
  }
  postDiagnosticoPorCodigo(codigo:string,inputRequest) {
    return this.http.post(`${this.base_url}/${this.bd}/sis/prestacion/guardar/diagnostico/${codigo}`,inputRequest);
  }
  putDiagnosticoPorCodigo(codigo:string,cie10:string,inputRequest) {
    return this.http.post(`${this.base_url}/${this.bd}/sis/prestacion/update/diagnostico/${codigo}/${cie10}`,inputRequest);
  }


}
