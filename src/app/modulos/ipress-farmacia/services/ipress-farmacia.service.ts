import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IpressFarmaciaService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }

  getListaMedicamentosFarmaciaXIpress(codRenipress) {
    return this.http.get(`${this.base_url}/${this.bd}/farmacia/listar/${codRenipress}`);
  }

  searchMedicamentoFarmaciaXIpress(idIpress, data) {
    return this.http.get(`${this.base_url}/${this.bd}/farmacia/buscar/${idIpress}/${data}`);
  }

  addMedicamentoFarmaciaXIpress(idIpress, data) {
    return this.http.post(`${this.base_url}/${this.bd}/farmacia/registrar/${idIpress}`,data);
  }

  updateMedicamentoFarmaciaXIpress(idIpress, data) {
    return this.http.post(`${this.base_url}/${this.bd}/farmacia/actualizar/${idIpress}`,data);
  }

}
