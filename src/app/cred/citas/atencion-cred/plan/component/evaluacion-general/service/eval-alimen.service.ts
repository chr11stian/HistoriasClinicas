import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, FechaEvaluacionAlimentacion } from '../models/EvaluacionAlimentacion';
import { datosEEDPTabla, EscalaEEDP, escalaEval_EEDP_0_4_anios, tablaComparativa } from '../models/EscalaEEDP';
import { DatePipe } from '@angular/common';
import {environment} from "../../../../../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class EvalAlimenService {
  //url = 'http://192.168.5.3:3012/api/hce/cred/';
  url = 'http://190.108.93.145:3012/api/hce/cred/'
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  /**cambios hechos por madai**/
  getEvaluacionAlimenticiaCred(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/evaluacion/alimentacion/${nroDoc}`);
  }
  addEvaluacionAlimenticiaCred(nroDoc,data){
    return this.http.post(`${this.base_url}/${this.bd}/cred/add/evaluacion/alimentacion/${nroDoc}`,data);
  }
  updateEvaluacionAlimenticiaCred(nroDoc,data){
    return this.http.put(`${this.base_url}/${this.bd}/cred/update/evaluacion/alimentacion/${nroDoc}`,data);
  }
  lastEvaluacionAlimenticiaCred(nroDoc){
    return this.http.get(`${this.base_url}/${this.bd}/cred/evaluacion/alimentacion/ultima/${nroDoc}`);
  }

  getProductsSmall() {
    return this.http.get<any>('assets/data/products-small.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
  }

  getEvaluacionAlimenticia() {
    return this.http.get<any>('assets/data/evaluacion-alimenticia.json')
        .toPromise()
        .then(res => <FechaEvaluacionAlimentacion[]>res.data)
        .then(data => { return data; });
  }


  getEscalaEEDP() {
    return this.http.get<any>('assets/data/escala-evaluacion-alimenticia.json')
        .toPromise()
        .then(res => <EscalaEEDP>res.data)
        .then(data => { return data; });
  }

  getEscalaEEDParray() {
    return this.http.get<any>('assets/data/escalaEEDP.json')
        .toPromise()
        .then(res => <datosEEDPTabla>res.data)
        .then(data => { return data; });
  }

  getEEDPBack() {
    return this.http.get<any>('assets/data/evaluacion_general.json')
        .toPromise()
        .then(res => <escalaEval_EEDP_0_4_anios[]>res.escalaEval_EEDP_0_4_anios)
        .then(data => { return data; });
  }

  getEscalaEvaluacion(dniConsulta) {
    return this.http.get<any>(this.url + 'escala/evaluacion/listar/' + dniConsulta)
        .toPromise()
        .then(res => <escalaEval_EEDP_0_4_anios[]>res.object)
        .then(data => { return data; })
        .catch(error => { return error })
  }

  getTablaComparativaMes(mes) {
    return this.http.get<any>(this.url + 'tabla/eedp/'+ mes)
        .toPromise()
        .then(res => <tablaComparativa[]>res.object)
        .then(data => { return data; })
        .catch(error => { return error })
  }

  // =================== GUARDAR EVALUACION NINIO POR MES =======================================
  postEvaluacionEEDP(dni,evaluacion) {
    return this.http.post<any>(this.url + 'escala/evaluacion/agregar/' + dni, evaluacion)
        .toPromise()
        .then(data => {console.log('creacion exitosa', data)})
        .catch(error => { console.log('error en la creacion', error) })
  }

  // =================== ACTUALIZAR REGISTROS EEDP ==============================================
  putEvaluacionEEDP(dni,evaluacion) {
    return this.http.put<any>(this.url + 'escala/evaluacion/modificar/' + dni, evaluacion)
        .toPromise()
        .then(data => {console.log('creacion exitosa', data)})
        .catch(error => { console.log('error en la creacion', error) })
  }
}
