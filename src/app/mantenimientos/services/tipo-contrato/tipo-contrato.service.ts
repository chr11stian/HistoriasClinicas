import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoContratoService {

  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getTipoContrato() {
    return this.http.get(`${this.base_url}/${this.bd}/contrato/lista`);
  }
  createTipoContrato(grupo){
    return this.http.post<any>(`${this.base_url}/${this.bd}/contrato/save`, grupo)
  }
  deleteTipoContrato(id){
    return this.http.delete(`${this.base_url}/${this.bd}/contrato/${id}`)
  }
  editTipoContrato(grupo){
    return this.http.post<any>(`${this.base_url}/${this.bd}/contrato/actualizar`, grupo)
  }
}
