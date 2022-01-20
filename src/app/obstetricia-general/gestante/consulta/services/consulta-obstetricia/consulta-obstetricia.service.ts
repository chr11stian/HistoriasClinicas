import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaObstetriciaService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getDatosConsultasObstetricasListar(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/listar`, data)
  }
  postDatoConsultaObstetrica(data,nroFetos) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarConsulta/${nroFetos}`, data)
  }
  putDatoConsultaObstetrica(data,nroFetos) {
    return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarConsulta/${nroFetos}`, data)
  }
  traerDatosParaConsultaNueva(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/numeroUltimaConsulta`, data)
  }
  postConsultaNoControl(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarConsultaNoControl`, data)
  }
  getListarConsultasNoControl(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/listarNoControl`, data)
  }
  getConsultasNoControlById(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/listarNoControlxid`, data)
  }
}
