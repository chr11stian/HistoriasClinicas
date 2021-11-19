import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PartoAbortoService {
  base_url = environment.baseUrl;
  // bd = environment.bd;
  bd = "api/hce";

  constructor(private http:HttpClient) { }
  addPartoAborto(tipoDoc,dniPaciente,inputParto:any) {
    return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarparto-aborto/${tipoDoc}/${dniPaciente}`,inputParto);
  }
  getPartoAborto(tipoDoc,dniPaciente) {
    return this.http.get(`${this.base_url}/${this.bd}/filiacion/guardarparto-aborto/${tipoDoc}/${dniPaciente}`);
  }
}
