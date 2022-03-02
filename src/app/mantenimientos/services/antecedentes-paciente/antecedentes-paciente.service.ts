import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AntecedentesPacienteService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  getAntecedentes(nroHcl) {
    return this.http.get(`${this.base_url}/${this.bd}/antecedentes/${nroHcl}/`);
  }

  addAntecedentes(data) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/antecedentes/`, data)
  }

  updateAntecedentesPersonales(data) {
    return this.http.put(`${this.base_url}/${this.bd}/antecedentes/actualizarPer`,data)
  }

  updateAntecedentesFamiliares(data) {
    return this.http.put(`${this.base_url}/${this.bd}/antecedentes/actualizarFam`,data)
  }

  getDatosReniec(doc){
    return this.http.get(`${this.base_url}/${this.bd}/pide/datos-sis/${doc}`)
  }

}
