import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntervaloPartoService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }

  getIntervalosPartoById(id,fecha) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/planparto/obtener/PlanItems/${id}/${fecha}`)
  }
  postIntervalosParto(id, data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/planparto/guardar/agregarPlanItem/${id}`, data)
  }
  /*getConsultaExistePlanParto(id) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/planparto/existe/${id}`)
  }*/
}
