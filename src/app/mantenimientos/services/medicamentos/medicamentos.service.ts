import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  /****Mantenimientos de Medicamentos con sus respectivas presentaciones***/

  getMedicamentosPorId(id) {
    return this.http.get(`${this.base_url}/${this.bd}/medicamento/${id}/`);
  }

  getMedicamentosPorCodigo(codigo) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/medicamento/byCodigo/`, codigo)
  }

  getMedicamentosAll() {
    return this.http.get<any>(`${this.base_url}/${this.bd}/medicamento/all`)
  }

  searchMedicamento(filtro){
    return this.http.get(`${this.base_url}/${this.bd}/medicamento/find/${filtro}`)
  }

  updateMedicamentos(codigo,data) {
    return this.http.put(`${this.base_url}/${this.bd}/medicamento/${codigo}/`,data)
  }

  addMedicamentos(data){
    return this.http.post(`${this.base_url}/${this.bd}/medicamento/`,data)
  }
}
