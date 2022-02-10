import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UnidadEjecutoraService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getUnidadesEjecutoras() {
    return this.http.get(`${this.base_url}/${this.bd}/unidadejecutora`);
  }
  createUnidadEjecutora(unidad) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/unidadejecutora`, unidad)
  }
  deleteUnidadEjecutora(id) {
    return this.http.delete(`${this.base_url}/${this.bd}/unidadejecutora/${id}`)
  }
  editUnidadEjecutora(unidad) {
    return this.http.put<any>(`${this.base_url}/${this.bd}/unidadejecutora`, unidad)
  }
}