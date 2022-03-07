import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteViviendaService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }


  getDatosGenerales(dni:string){
    return this.http.get(`${this.base_url}/${this.bd}/cred/antecedentes/vivienda/saneamiento/listar/${dni}`);
  }

  addAntecedentesVivienda(dni:string,data){
    return this.http.post(`${this.base_url}/${this.bd}/cred/antecedentes/vivienda/saneamiento/agregar/${dni}`,data);
  }

  updateAntecedentesVivienda(dni:string,data){
    return this.http.put(`${this.base_url}/${this.bd}/cred/antecedentes/vivienda/saneamiento/modificar/${dni}`,data);
  }



}