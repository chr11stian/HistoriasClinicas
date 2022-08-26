import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class InterconsultaService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}
  listInterconsulta() {
    return this.http.get(
      `${this.base_url}/${this.bd}/cupo/listar/interconsulta`
    );
  }
}
