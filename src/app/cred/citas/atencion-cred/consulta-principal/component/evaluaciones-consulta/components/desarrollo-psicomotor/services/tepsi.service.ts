import { Injectable } from '@angular/core';
import {environment} from "../../../../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {escalaEval_EEDP_0_4_anios} from "../../../../../../plan/component/evaluacion-general/models/EscalaEEDP";

@Injectable({
  providedIn: 'root'
})
export class TepsiService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }
  getTablaPuntaje1(edad) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/tepsi/tablapuntaje/${edad}`)
      .toPromise()
      .then(data => { return data })
      .catch(error => { return error })
  }
  getTablaPuntaje(edad:number) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/tepsi/tablapuntaje/${edad}`);
  }
  addRegistroTepsi(nroDNI:string,inputRequest){
    return this.http.post(`${this.base_url}/${this.bd}/cred/add/tepsi/${nroDNI}`,inputRequest);
  }
  getRegistroTepsi(idConsulta:string){
    return this.http.get(`${this.base_url}/${this.bd}/cred/tepsi/${idConsulta}`);
  }
  getConsultaTepsi(idConsulta:string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/tepsi/${idConsulta}`)
      .toPromise()
      .then(data => { return data })
      .catch(error => { return error })
  }

  // getConsultaTepsi(idConsulta:string){
  //   return this.http.get(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/tepsi/${idConsulta}`);
  // }
  postConsultaTepsi(idConsulta:string,requestInput){
    return this.http.post(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/tepsi/${idConsulta}`,requestInput);
  }
  putConsultaTepsi(idConsulta:string,requestInput){
    return this.http.put(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/tepsi/${idConsulta}`,requestInput);
  }
}
