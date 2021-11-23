import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PartoAbortoService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http:HttpClient) { }
  addPartoAborto(idPaciente,inputParto:any) {
    return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarparto-aborto/${idPaciente}`,inputParto);
  }
  updatePartoAborto(idPaciente,inputParto:any) {
    return this.http.put(`${this.base_url}/${this.bd}/filiacion/guardarparto-aborto/${idPaciente}`,inputParto);
  }
  getPartoAborto(idPaciente) {
    return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarparto-aborto/${idPaciente}`);
  }
}
