import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }

  listarCitasXservicio(id,data){
    return this.http.post(`${this.base_url}/${this.bd}/cupo/listar/citas/servicio/${id}`, data)
  }

  listarCitasTentativasEnfermeria(){
    //return this.http.post(`${this.base_url}/${this.bd}/cupo/listarPendientesEnfermeria/${id}`, data)
  }
  listarCitasTentativasMedicina(){
    //return this.http.post(`${this.base_url}/${this.bd}/cupo/listarPendientesMedicionGeneral/${id}`, data)
  }
  listarCitasTentativasObstetricia(){
    //return this.http.post(`${this.base_url}/${this.bd}/cupo/listarPendientesObstetricia/${id}`, data)
  }
}
