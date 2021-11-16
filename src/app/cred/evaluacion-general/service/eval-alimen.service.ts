import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, FechaEvaluacionAlimentacion } from '../models/EvaluacionAlimentacion';
import { EscalaEEDP } from '../models/EscalaEEDP';

@Injectable({
  providedIn: 'root'
})
export class EvalAlimenService {

  constructor(private http: HttpClient) { }

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
    .then(res => <EscalaEEDP[]>res.data)
    .then(data => { return data; });
  }
}
