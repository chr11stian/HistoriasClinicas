import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenesAuxiliaresService {
  urlServer = environment.baseUrl
  bd = environment.bd

  constructor(private http: HttpClient) { }

  postExamenesAuxiliares(idConsulta: string, data) {
    return this.http.post(`${this.urlServer}/${this.bd}/examenesAuxiliares/crear-Laboratorios-resultados/${idConsulta}`, data);
  }
  getListaServiciosLaboratorio() {
    return this.http.get(`${this.urlServer}/${this.bd}/tools/laboratorios`);
  }
  getListarResultadosLaboratorioByIdConsulta(idConsulta) {
    return this.http.get(`${this.urlServer}/${this.bd}/examenesAuxiliares/buscar/id/consulta/${idConsulta}`);
  }
  putAddExamenesAuxiliares(idConsulta: string, data) {
    return this.http.put(`${this.urlServer}/${this.bd}/examenesAuxiliares/crear-Laboratorios-resultados/${idConsulta}`, data);
  }
  postAddExamenesAuxiliares(idConsulta: string, data) {
    return this.http.post(`${this.urlServer}/${this.bd}/examenesAuxiliares/agregar-laboratorio-consultorio-lab/${idConsulta}`, data);
  }
  /**PROMISES */
  getPromiseListaServiciosLaboratorio() {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/tools/laboratorios-resultados`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getPromiseListarResultadosLaboratorioByIdConsulta(idConsulta) {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/examenesAuxiliares/buscar/id/consulta/${idConsulta}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  putPromiseAddAuxiliarExam(idConsulta: string, data) {
    return this.http.put<any>(`${this.urlServer}/${this.bd}/examenesAuxiliares/buscar/id/consulta/${idConsulta}`, data)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  postPromiseAddServiciosLaboratorio(idConsulta: string, data) {
    return this.http.post<any>(`${this.urlServer}/${this.bd}/examenesAuxiliares/crear-Laboratorios/${idConsulta}`, data)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getExamListLaboratory() {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/ipress/laboratorios/listar`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  putAddLaboratoryIpress(data) {
    return this.http.put<any>(`${this.urlServer}/${this.bd}/ipress/laboratorio/save`, data)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getListarPeticiones(idConsulta: string) {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/consultageneral/listar/solicitud/examen/${idConsulta}`)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  putAgregarExamenesConsulta(idConsulta, data) {
    return this.http.post<any>(`${this.urlServer}/${this.bd}/examenesAuxiliares/agregar-laboratorio-consultorio-lab/${idConsulta}`, data)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
} 
