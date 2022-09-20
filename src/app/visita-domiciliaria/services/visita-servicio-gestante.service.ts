import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaServicioGestanteService {

  couch: boolean = false;
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view=environment.base_url_couch_view;
  //id profesional
  id_user: string = JSON.parse(localStorage.getItem("usuario"));
  token =
    "eyJraWQiOiJmb28iLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY2MzYzNjI5Mn0.Xet-o0UKwXsQ21cpWLggZiRIOV2T9w8yIMyGwFJwGIc";
  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  mostrarVisitas(): Observable<any> {
    return this.http.post<any[]>(
      `${this.base_url}/${this.bd}/_find`,
      {
        selector: {
          tipo_doc: "visita_domiciliaria_profesional",
          tipo_ficha: "gestante_visita_profesional",
        },
      }
    );
  }


}
