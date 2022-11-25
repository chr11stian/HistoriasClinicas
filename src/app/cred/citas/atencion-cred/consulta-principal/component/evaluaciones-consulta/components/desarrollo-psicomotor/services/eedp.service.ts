import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EedpService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  postAgregarEEDP(idConsulta: string, dataEEDP) {
    return this.http.post(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/eedp/${idConsulta}`, dataEEDP);
  }
  getEEDPxIdConsulta(idConsulta: string) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/eedp/${idConsulta}`);
  }
  getListarEEDPxHistoria(nroHcl: string) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/planintegral/evaluacion/eedp/${nroHcl}`)
  }
  putEEDPxByIdConsulta(idConsulta: string, dataEEDP) {
    return this.http.put(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/eedp/${idConsulta}`, dataEEDP);
  }
  // LEER DATOS DE JSON
  getDatosTablaEEDP() {
    return this.http.get<any>('assets/data/tabla-perfil-desarrollo-psicomotor.json')
      .toPromise()
      .then(res => <any>res.data)
      .then(data => { return data; });
  }
  postPromiseAddEEDP(idConsulta: string, dataEEDP) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/eedp/${idConsulta}`, dataEEDP)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getPromiseEEDPxIdConsulta(idConsulta: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/eedp/${idConsulta}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getPromiseEEDPxNroHcl(nroHcl: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/planintegral/evaluacion/eedp/${nroHcl}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
}
