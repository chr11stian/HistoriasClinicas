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
  getRolGuardiaPorPersonal(rol11: any) {
    return this.http.post(
      `${this.base_url}/${this.bd}/api/rolguardia/persona`,
      rol11
    );
  }
  AddRolGuardia(rolDia: any) {
    return this.http.post(
      `${this.base_url}/${this.bd}/api/rolguardia/upsertArreglo`,
      rolDia
    );
  }
  getTurnosPorIpress(idIpress) {
    return this.http.get(
      `${this.base_url}/${this.bd}/api/listarServicios/${idIpress}`
    );
  }
  getUpsPorIpress(idIpress) {
    return this.http.get(
      `${this.base_url}/${this.bd}/api/listarTurnos/${idIpress}`
    );
  }
}
