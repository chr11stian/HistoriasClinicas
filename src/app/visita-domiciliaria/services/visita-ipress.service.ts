import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { VisitasProfesionalGestantes } from "../interfaces/visita_profesional_gestantes";
import { VisitasProfesionalNinios } from "../interfaces/visita_profesional_ninios";
@Injectable({
  providedIn: "root",
})
export class VisitaIpressService {
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view = environment.base_url_couch_view;

  base_url_mongo = environment.baseUrl;
  bd_hce = environment.bd;

  constructor(private http: HttpClient) {}

  getVisitasProfesionalesPorIpress(idIpress: string) {
    return this.http.post<any[]>(`${this.base_url_view}/visitas_resumen`, {
      keys: [idIpress],
    });
  }

  getVisitasGestantesXprofesionalTodo(
    idIpress: any,
    dni_profesional: any
  ): any {
    return this.http.post<VisitasProfesionalGestantes[]>(
      `${this.base_url_view}/visita-profesional-gestantes-todo`,
      {
        keys: [[idIpress, dni_profesional]],
      }
    );
  }

  getVisitasNiniosXProfesionalTodo(idIpress: string, dni_profesional: string) {
    return this.http
      .post<VisitasProfesionalNinios[]>(
        `${this.base_url_view}/VPN_XProfesionalTodo`,
        {
          keys: [[idIpress, dni_profesional]],
        }
      )
      .toPromise()
      .then((res) => <any[]>res)
      .then((data) => {
        return data;
      });
  }
}
