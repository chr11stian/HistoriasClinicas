import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DatosGeneralesService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  getDatosReniec(doc){
    return this.http.get(`${this.base_url}/${this.bd}/pide/datos-sis/${doc}`)
  }
  getPacientePorDoc(data){
    return this.http.post(`${this.base_url}/${this.bd}/paciente/docId`,data)
  }

  addConsultaDatosGenerales(data){
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/agregarConsulta`,data)
  }

}
