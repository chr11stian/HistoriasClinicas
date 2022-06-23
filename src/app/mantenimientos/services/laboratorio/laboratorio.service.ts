import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  postSaveLaboratorio(data) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/LaboratorioMatenimiento/save`, data)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getLaboratorioList() {
    return this.http.get<any>(`${this.base_url}/${this.bd}/LaboratorioMatenimiento/listar`)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  putLaboratorio(idExamen: string, data) {
    return this.http.put<any>(`${this.base_url}/${this.bd}/LaboratorioMatenimiento/update/${idExamen}`, data)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }

  getIpressExamListLaboratory() {
    return this.http.get<any>(`${this.base_url}/${this.bd}/ipress/laboratorios/listar`)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  putAddLaboratoryIpress(data) {
    return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/laboratorio/save`, data)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  deleteLaboratorio(idExamen: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/ipress/laboratorios/delete/${idExamen}`)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
}
