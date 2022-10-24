import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class VisitaIpressService {
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view = environment.base_url_couch_view;

  constructor(private http: HttpClient) {}

  getVisitasProfesionalesPorIpress(idIpress: string) {
    return this.http.post<any[]>(`${this.base_url_view}/visitas_resumen`, {
      keys: [idIpress],
    });
  }
}
