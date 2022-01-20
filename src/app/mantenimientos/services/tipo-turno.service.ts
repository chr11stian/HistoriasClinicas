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
    return this.http.get(`${this.base_url}/${this.bd}/tipoturno`);
  }
  deleteTipoTurno(id: string) {
    return this.http.delete(`${this.base_url}/${this.bd}/tipoturno/${id}`);
  }
  getTipoTurno(id: string) {
    return this.http.get(`${this.base_url}/${this.bd}/tipoturno/${id}`);
  }
  addTipoTurno(turno: any) {
    return this.http.post(`${this.base_url}/${this.bd}/tipoturno`, turno);
  }
  updateTipoTurno(turno: any) {
    return this.http.put(`${this.base_url}/${this.bd}/tipoturno`, turno);
  }
}
