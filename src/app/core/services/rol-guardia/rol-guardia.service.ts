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
  getRolGuardiaPorPersona(inputRequest: any) {
    return this.http.post(
      `${this.base_url}/${this.bd}/api/rolguardia/persona`,
      inputRequest
    );
  }
  AddRolGuardia(rolDia: any) {
    return this.http.post(
      `${this.base_url}/${this.bd}/api/rolguardia/upsertArreglo`,
      rolDia
    );
  }
  getServiciosPorIpress(idIpress) {
    return this.http.get(
      `${this.base_url}/${this.bd}/api/ipress/listarServicios/${idIpress}`
    );
  }
  getTurnosPorIpress(idIpress) {
    return this.http.get(
      `${this.base_url}/${this.bd}/api/ipress/listarTurnos/${idIpress}`
    );
  }
}
