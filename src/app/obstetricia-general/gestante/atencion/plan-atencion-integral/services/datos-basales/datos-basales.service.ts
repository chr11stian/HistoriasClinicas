import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosBasalesService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor( private http:HttpClient) { }

  getPacienteNroDocFiliacion(tipoDoc, nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarpaciente/${tipoDoc}/${nroDoc}`)
  }

  postDatosBasales(tipoDoc: string, nroDoc: string, data) {
    return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarembarazo/${tipoDoc}/${nroDoc}`, data)
}
}
