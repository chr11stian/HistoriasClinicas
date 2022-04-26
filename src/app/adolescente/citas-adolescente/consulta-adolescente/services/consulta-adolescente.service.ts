import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaAdolescenteService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  tipoDoc: string
  nroDoc: string;
  nroHcl: string;

  constructor(private http: HttpClient) { }

  getListarConsultasAdolecentes(nroHcl) {
    return this.http.get(`${this.base_url}/${this.bd}/adolescentes/consulta/listar/${nroHcl}/`)
  }
  postAgregarConsultaAdolescente(data) {
    return this.http.post(`${this.base_url}/${this.bd}/adolescentes/consulta/agregar/`, data);
  }
  putActualizarDatosGrles(idConsulta, data) {
    return this.http.put(`${this.base_url}/${this.bd}/adolescentes/consulta/actualizarDG/${idConsulta}/`, data);
  }
  putActualizarExamenes(idConsulta, data) {
    return this.http.put(`${this.base_url}/${this.bd}/adolescentes/consulta/actualizarExamenes/${idConsulta}/`, data);
  }
  putActualizarDiagnostico(idConsultaAdolescente, data) {
    return this.http.put(`${this.base_url}/${this.bd}/adolescentes/consulta/actualizarDiagnostico/${idConsultaAdolescente}/`, data);
  }
  putActualizarTratamiento(idConsultaAdolescente,data){
    return this.http.put(`${this.base_url}/${this.bd}/adolescentes/consulta/actualizarTratamiento/${idConsultaAdolescente}/`, data);
  }
}
