import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TipoSeguroService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getTipoSeguro() {
    return this.http.get(`${this.base_url}/${this.bd}/api/tiposeguro`);
  }
  createTipoSeguro(condicion){
    return this.http.post<any>(`${this.base_url}/${this.bd}/api/tiposeguro`, condicion)
  }
  deleteTipoSeguro(id){
    return this.http.delete(`${this.base_url}/${this.bd}/api/tiposeguro/${id}`)
  }
  editTipoSeguro(condicion){
    return this.http.put<any>(`${this.base_url}/${this.bd}/api/tiposeguro`, condicion)
  }
}
