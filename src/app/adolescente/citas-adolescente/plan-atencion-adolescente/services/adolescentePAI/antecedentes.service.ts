import { Injectable } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http:HttpClient) { }
  getAntecedentes(tipoDoc:string,nroDNI:string) {
    return this.http.get(`${this.base_url}/${this.bd}/adolescentes/buscarantecedentes/${tipoDoc}/${nroDNI}`);
  }
  addAntecendentes(tipoDoc:string,nroDNI:string,inputRequest:any) {
    return this.http.post(`${this.base_url}/${this.bd}/adolescentes/guardarantecedentes/${tipoDoc}/${nroDNI}`,inputRequest);
  }
}
