import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VisitasProfesionalNinios } from '../interfaces/visita_profesional_ninios';
@Injectable({
  providedIn: 'root'
})
export class VisitaNinioService {
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view=environment.base_url_couch_view;

  constructor(private http: HttpClient ) { }

  getVisitasNiniosXProfesional(dni_profesional: string) {
    return this.http.post<VisitasProfesionalNinios[]>(
      `${this.base_url_view}/visita_domiciliaria_XProfesionalNinio`,
      {
        keys: [dni_profesional],
      }
    );
  }

  buscarVisitaNiniosXAnioMes(fecha: string) {
    return this.http.post<VisitasProfesionalNinios[]>(
      `${this.base_url_view}/visita_domiciliaria_profesional_NinioXAnioXMes`,
      {
        keys: [fecha],
      }
    );
  }

  buscarVisitaNiniosXAnio(fecha: string) {
    return this.http.post<VisitasProfesionalNinios[]>(
      `${this.base_url_view}/visita_domiciliaria_profesional_NinioXAnio`,
      {
        keys: [fecha],
      }
    );
  }
}
