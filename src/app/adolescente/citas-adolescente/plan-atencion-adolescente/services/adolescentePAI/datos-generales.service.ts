import { Injectable } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatosGeneralesService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http:HttpClient) { }
  getAdolescente(tipoDoc:string,nroDNI:string) {
    return this.http.get(`${this.base_url}/${this.bd}/adolescentes/buscardatosgenerales/${tipoDoc}/${nroDNI}`);
  }
  addAdolescente(tipoDoc:string,nroDNI:string,inputRequest:any) {
    return this.http.post(`${this.base_url}/${this.bd}/adolescentes/guardardatosgenerales/${tipoDoc}/${nroDNI}`,inputRequest);
  }
}

