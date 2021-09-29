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

  getTipoPersonal() {
    // return this.http.get(`${this.base_url}/${this.bd}/ubicacion/listar`);
    return this.http.get(`${this.base_url}/${this.bd}/api/tipopersonal`);
  }
}
