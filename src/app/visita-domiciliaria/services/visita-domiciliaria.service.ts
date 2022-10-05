import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { VisitasProfesionalNinios } from "../interfaces/visita_profesional_ninios";

@Injectable({
  providedIn: "root",
})
export class VisitaDomiciliariaService {
  couch: boolean = false;
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view = environment.base_url_couch_view;
  //id profesional
  id_user: string = JSON.parse(localStorage.getItem("usuario"));
  token =
    "eyJraWQiOiJmb28iLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2MzgwNzIyNX0.cacGjbndREWSu3uqKCWYmXQ1usAy6uA1rWoZGwg3u8s";
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
}
