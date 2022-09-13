import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesarrolloPsicomotorService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  verifyEvaluatedMonth(month: number, nroHistoria: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/test/mes/valido/${month}/${nroHistoria}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
  }

  verifyMonthlyEvaluation(month: number, nroHistoria: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/realizadas/${month}/${nroHistoria}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
  }
}
