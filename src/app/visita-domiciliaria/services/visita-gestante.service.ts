import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { VisitasProfesionalGestantes } from "../interfaces/visita_profesional_gestantes";

@Injectable({
  providedIn: "root",
})
export class VisitaGestanteService {
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view = environment.base_url_couch_view;

  constructor(private http: HttpClient) {}

  getVisitasGestantesXProfesional(dni_profesional: string) {
    return this.http.post<VisitasProfesionalGestantes[]>(
      `${this.base_url_view}/visita-profesional-gestantes`,
      {
        keys: [dni_profesional],
      }
    );
  }

  getVisitasGestantesXprofesionalTodo(idIpress:any,dni_profesional:any):any{
    return this.http.post<VisitasProfesionalGestantes[]>(
      `${this.base_url_view}/visita-profesional-gestantes-todo`,
      {
          keys: [[idIpress, dni_profesional]],
      }
  );
  } 

  getVisitasGestantesXProfesionalXAnioXMesFecha(idIpress:any,dni_profesional:any,anio_mes:any):any{
    return this.http.post<VisitasProfesionalGestantes[]>(
      `${this.base_url_view}/visita-profesional-gestantes-fecha`,
      {
          keys: [[idIpress, dni_profesional, anio_mes]],
      }
  );
  }

  getVisitasGestantesXProfesionalAnio(idIpress:any,dni_profesional:any,anio:any):any{
    return this.http.post<VisitasProfesionalGestantes[]>(
      `${this.base_url_view}/visita-profesional-gestantes-anio`,
      {
          keys: [[idIpress, dni_profesional, anio]],
      }
  );
  }

  buscarVisitaGestantesXAnioMes(fecha: string) {
    return this.http.post<VisitasProfesionalGestantes[]>(
      `${this.base_url_view}/visita_domiciliaria_XProfesionalGestanteFecha`,
      {
        keys: [fecha],
      }
    );
  }
}
