import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DatosGeneralesService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  getDatosReniec(doc) {
    return this.http.get(`${this.base_url}/${this.bd}/pide/datos-sis/${doc}`)
  }
  getPacientePorDoc(data) {
    return this.http.post(`${this.base_url}/${this.bd}/paciente/docId`, data)
  }

  addConsultaDatosGenerales(data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/agregarConsulta`, data)
  }
  putUpdateConsultaGeneralByIdConsulta(data) {
    return this.http.put(`${this.base_url}/${this.bd}/consultageneral/actualizarConsulta`, data)
  }
  updateConsultaDatosGenerales(data) {
    return this.http.put(`${this.base_url}/${this.bd}/consultageneral/actualizarConsulta`, data)
  }
  searchConsultaDatosGenerales(idConsulta) {
    return this.http.get(`${this.base_url}/${this.bd}/consultageneral/buscar/${idConsulta}`)
  }

  getDatosTriajeByIdCupo(idCupo: string) {
    return this.http.get(`${this.base_url}/${this.bd}/cupo/obtener/triaje/cupo/id/${idCupo}`)
  }

  getPromisePacienteByDoc(data) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/paciente/docId`, data)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
}
