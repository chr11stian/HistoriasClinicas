import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  base_url = environment.baseUrl;
  bd = environment.bd;
  base_uri = environment.base_uri;

  constructor(private http: HttpClient) { }

  getPacientes() {
    return this.http.get(`${this.base_url}/${this.bd}/paciente`);
  }

  postPacientes(data) {
    return this.http.post(`${this.base_url}/${this.bd}/paciente`, data);
  }

  putPaciente(data) {
    return this.http.put(`${this.base_url}/${this.bd}/paciente`, data);
  }

  deletePaciente(idPaciente) {
    return this.http.delete(`${this.base_url}/${this.bd}/paciente/${idPaciente}`);
  }

  getPacienteByNroDoc(data) {
    return this.http.post(`${this.base_url}/${this.bd}/paciente/docId`, data)
  }

  getNroHclByDocYTipoDocumento(datosPaciente) {
    return this.http.post(`${this.base_url}/${this.bd}/paciente/buscarNroHcl`, datosPaciente)
  }
  getDataReniecPaciente(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/pide/datos-sis/${nroDoc}`)
  }
  /**PROMISES */
  getPromisePacienteByNroDoc(data) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/paciente/docId`, data)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }

  getPidePatientData(nroDoc: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/pide/consultar/${nroDoc}`)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
}
