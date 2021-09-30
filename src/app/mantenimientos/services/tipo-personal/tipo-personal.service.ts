import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { TipoPersonal } from "../../../core/models/mantenimiento.models";

@Injectable({
  providedIn: "root",
})
export class TipoPersonalService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getTipoPersonales() {
    // return this.http.get(`${this.base_url}/${this.bd}/ubicacion/listar`);
    return this.http.get(`${this.base_url}/${this.bd}/api/tipopersonal`);
  }
  getTipoPersonal(id: string) {
    return this.http.get(`${this.base_url}/${this.bd}/api/tipopersonal/${id}`);
  }
  addTipoPersonal(personal: any) {
    return this.http.post(
      `${this.base_url}/${this.bd}/api/tipopersonal`,
      personal
    );
  }
  updateTipoPersonal(personal: any) {
    return this.http.put(
      `${this.base_url}/${this.bd}/api/tipopersonal`,
      personal
    );
  }
  deleteTipoPersonal(id: string) {
    return this.http.delete(
      `${this.base_url}/${this.bd}/api/tipopersonal/${id}`
    );
  }
}
