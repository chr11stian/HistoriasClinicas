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
  postDatoConsultaObstetrica(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarConsulta`, data)
  }
  putDatoConsultaObstetrica(data) {
    return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarConsulta`, data)
  }
  traerDatosParaConsultaNueva(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/numeroUltimaConsulta`, data)
  }
  /*getConsultaExistePlanParto(id) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/planparto/existe/${id}`)
  }*/
  postConsultaNoControl(data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarConsultaNoControl`, data)
  }
  getGananciaSobrePeso(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaSobrePeso/${semanas}`)
  }
  getGananciaObesa(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaObesa/${semanas}`)
  }
  getGananciaPesoRegular(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaPesoRegular/${semanas}`)
  }
  getGananciaBajoPeso(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaBajoPeso/${semanas}`)
  }
}
