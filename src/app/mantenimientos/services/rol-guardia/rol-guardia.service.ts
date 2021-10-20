import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RolGuardiaService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) {}
  getRolGuardias() {
    // return this.http.get(`${this.base_url}/${this.bd}/ubicacion/listar`);
    return this.http.get(`${this.base_url}/${this.bd}/api/rolguardia`);
  }
  AddUpdateRolGuardia(rolDia: any) {
    return this.http.post(`${this.base_url}/${this.bd}/api/rolguardia`, rolDia);
  }
}
