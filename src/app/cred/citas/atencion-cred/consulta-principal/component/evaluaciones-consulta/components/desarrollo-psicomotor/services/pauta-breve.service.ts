import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PautaBreveService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  postAgregarPB(idConsulta, dataPB) {
    return this.http.post(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/pautabreve/${idConsulta}`, dataPB);
  }

  getPBByIdConsulta(idConsulta) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/pautabreve/${idConsulta}`);
  }

  getListarPBByNroHcl(nroHcl) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/pautabreve/${nroHcl}`);
  }

  putActualizarPBByIdConsulta(idConsulta, dataPB) {
    return this.http.put(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/pautabreve/${idConsulta}`, dataPB);
  }
  /** PROMISES DE PAUTA BREVE  */
  getPromisePautaBreveByNroHcl(nroHcl) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/evaluacion/pautabreve/${nroHcl}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error });
  }
  getPromisePBByIdConsulta(idConsulta) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/pautabreve/${idConsulta}`)
      .toPromise()
      .then(res => <any>res)
      .then(data => { return data; })
      .catch(error => { return error });
  }
}
