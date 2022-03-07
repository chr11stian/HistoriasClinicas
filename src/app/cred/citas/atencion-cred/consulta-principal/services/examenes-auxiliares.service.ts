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
    return this.http.post(`${this.urlServer}/${this.bd}/examenesAuxiliares/crear-Laboratorios/${idConsulta}`, data);
  }
  getListaServiciosLaboratorio() {
    return this.http.get(`${this.urlServer}/${this.bd}/tools/laboratorios`);
  }
  /**PROMISES */
  getPromiseListaServiciosLaboratorio() {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/tools/laboratorios`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
}
