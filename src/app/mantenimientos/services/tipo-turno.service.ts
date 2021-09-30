import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TipoTurnoService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}
  getTipoTurnos() {
    return this.http.get(`${this.base_url}/${this.bd}/api/tipoturno`);
  }
  deleteTipoTurno(id: string) {
    return this.http.delete(`${this.base_url}/${this.bd}/api/tipoturno/${id}`);
  }
  getTipoTurno(id: string) {
    return this.http.get(`${this.base_url}/${this.bd}/api/tipoturno/${id}`);
  }
  addTipoTurno(turno: any) {
    return this.http.post(`${this.base_url}/${this.bd}/api/tipoturno`, turno);
  }
  updateTipoTurno(turno: any) {
    return this.http.put(`${this.base_url}/${this.bd}/api/tipoturno`, turno);
  }
}
