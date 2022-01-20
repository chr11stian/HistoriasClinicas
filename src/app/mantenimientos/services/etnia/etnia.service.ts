import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EtniaService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getEtnia() {
    return this.http.get(`${this.base_url}/${this.bd}/etnia`);
  }
  createEtnia(grupo){
    return this.http.post<any>(`${this.base_url}/${this.bd}/etnia`, grupo)
  }
  deleteEtnia(id){
    return this.http.delete(`${this.base_url}/${this.bd}/etnia/${id}`)
  }
  editEtnia(grupo){
    return this.http.put<any>(`${this.base_url}/${this.bd}/etnia`, grupo)
  }
}
