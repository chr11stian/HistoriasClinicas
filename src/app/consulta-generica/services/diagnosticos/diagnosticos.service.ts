import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticosService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }

  addDiagnostico(idConsulta, data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/agregarDiagnostico/${idConsulta}`, data)
  }

  updateDiagnostico(idConsulta, data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/actualizarDiagnostico/${idConsulta}`, data)
  }

  deleteDiagnostico(idConsulta, cie10SIS) {
    return this.http.delete(`${this.base_url}/${this.bd}/consultageneral/eliminarDiagnostico/${idConsulta}/${cie10SIS}`)
  }

  getDiagnostico(idConsulta) {
    return this.http.get(`${this.base_url}/${this.bd}/consultageneral/listarDiagnostico/${idConsulta}`)
  }

  addConsultaDatosGenerales(data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/agregarConsulta`, data)
  }
  updateConsultaDatosGenerales(data) {
    return this.http.put(`${this.base_url}/${this.bd}/consultageneral/actualizarConsulta`, data)
  }
  /****lista UPS HIS*********/
  listaUpsHis(data) {
    return this.http.post(`${this.base_url}/${this.bd}/ipress/listarups_his`, data)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }
  listaUpsAuxHis(data) {
    return this.http.post(`${this.base_url}/${this.bd}/ups/codUPS`, data)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }
  listaUpsAuxHisPorIpress(idIpress: string) {
    return this.http.get(`${this.base_url}/${this.bd}/ipress/listarups_his${idIpress}`)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }
  /***procedimientos****/
  getProcedimientos(idConsulta) {
    return this.http.get(`${this.base_url}/${this.bd}/consultageneral/listarProcedimientos/${idConsulta}`)
  }

  listaUpsAuxHisPerIpress(idIpress: string) {
    return this.http.get(`${this.base_url}/${this.bd}/ipress/listarupsaux/${idIpress}`)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }

  postPromiseDiagnostico(idConsulta: string, data) {
    return this.http.post(`${this.base_url}/${this.bd}/cred/consulta/diagnostico/${idConsulta}`, data)
      .toPromise()
      .then(res => res)
      .then(data => { return data; })
      .catch(error => { return error.error })
  }
  getPromiseDiagnosticPerConsultation(idConsulta: string) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/diagnostico/${idConsulta}`)
      .toPromise()
      .then(res => res)
      .then(data => { return data; })
      .catch(error => { return error.error })
  }
}
