import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GrupoEtarioService {

  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getGrupoEtario() {
    return this.http.get(`${this.base_url}/${this.bd}/grupoetario`);
  }
  createGrupoEtario(grupo){
    return this.http.post<any>(`${this.base_url}/${this.bd}/grupoetario`, grupo)
  }
  deleteGrupoEtario(id){
    return this.http.delete(`${this.base_url}/${this.bd}/grupoetario/${id}`)
  }
  editGrupoEtario(grupo){
    return this.http.put<any>(`${this.base_url}/${this.bd}/grupoetario`, grupo)
  }
}
