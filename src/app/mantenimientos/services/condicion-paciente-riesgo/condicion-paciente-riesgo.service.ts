import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CondicionPacienteRiesgoService {

  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getCondicionPacienteRiesgo() {
    return this.http.get(`${this.base_url}/${this.bd}/condicionpacienteriesgo`);
  }
  createCondicionPacienteRiesgo(condicion){
    return this.http.post<any>(`${this.base_url}/${this.bd}/condicionpacienteriesgo`, condicion)
  }
  deleteCondicionPacienteRiesgo(id){
    return this.http.delete(`${this.base_url}/${this.bd}/condicionpacienteriesgo/${id}`)
  }
  editCondicionPacienteRiesgo(condicion){
    return this.http.put<any>(`${this.base_url}/${this.bd}/condicionpacienteriesgo`, condicion)
  }
}
