import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TipoUpsService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}
  getTipoUPSs() {
    return this.http.get(`${this.base_url}/${this.bd}/api/tipoups/listar`);
  }
  deleteTipoUPS(id: string) {
    return this.http.delete(`${this.base_url}/${this.bd}/api/tipoups/${id}`);
  }
  getTipoUPS(id: string) {
    return this.http.get(`${this.base_url}/${this.bd}/api/tipoups/${id}`);
  }
  addTipoUPS(ups: any) {
    return this.http.post(`${this.base_url}/${this.bd}/api/tipoups/save`, ups);
  }
  updateTipoUPS(id: string, ups: any) {
    return this.http.put(
      `${this.base_url}/${this.bd}/api/tipoups/actualizar/${id}`,
      ups
    );
  }
}
