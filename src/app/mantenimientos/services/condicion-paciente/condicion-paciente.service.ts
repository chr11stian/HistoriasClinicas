import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CondicionPacienteService {

  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getCondicionPaciente() {
    return this.http.get(`${this.base_url}/${this.bd}/condicionpaciente`);
  }
  createCondicionPaciente(grupo){
    return this.http.post<any>(`${this.base_url}/${this.bd}/condicionpaciente`, grupo)
  }
  deleteCondicionPaciente(id){
    return this.http.delete(`${this.base_url}/${this.bd}/condicionpaciente/${id}`)
  }
  editCondicionPaciente(grupo){
    return this.http.put<any>(`${this.base_url}/${this.bd}/condicionpaciente`, grupo)
  }
}
