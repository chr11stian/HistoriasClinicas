import { Injectable } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {
  }
  addresultado(inputRequest) {
    return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarConsultorio/1`, inputRequest)
  }
  getResultado(inputRequest) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscarResultados`, inputRequest)
  }
}
