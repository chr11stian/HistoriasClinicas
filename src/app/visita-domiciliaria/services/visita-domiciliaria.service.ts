import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { VisitasProfesionalNinios } from "../interfaces/visita_profesional_ninios";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class VisitaDomiciliariaService {
  couch: boolean = false;
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view=environment.base_url_couch_view;
  //id profesional
  id_user: string = JSON.parse(localStorage.getItem("usuario"));
  token =
    "eyJraWQiOiJmb28iLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2MzcxNjYyMX0.Tzzzb6IGZsoDz3o8rxBKURExNHdmL9w6eztTZdY_6_4";
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  mostrarVisitas(): Observable<any> {
    return this.http.post<VisitasProfesionalNinios[]>(
      `${this.base_url}/${this.bd}/_find`,
      {
        selector: {
          tipo_doc: "visita_domiciliaria_profesional",
          tipo_ficha: "ninio_visita_profesional",
        },
      }
    );
  }

  getVisitasNiniosByProfesional(dni_profesional: string) {
    return this.http.post<VisitasProfesionalNinios[]>(
      `${this.base_url_view}/visita_domiciliaria_por_profesional_v1`,
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
