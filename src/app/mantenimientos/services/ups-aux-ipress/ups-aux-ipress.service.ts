import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UpsAuxIpressService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }

  getUpsAuxPorIpress(idIpress:string) {
    return this.http.get(`${this.base_url}/${this.bd}/ipress/listarupsaux/${idIpress}`);
  }

  addUpsAuxPorIpress(idIpress: string,data) {
    return this.http.put(`${this.base_url}/${this.bd}/ipress/agregarupsaux/${idIpress}`,data);
  }

  updateUpsAuxPorIpress(idIpress: string,data) {
    return this.http.put(`${this.base_url}/${this.bd}/ipress/actualizarupsaux/${idIpress}`,data);
  }

  deleteUpsAuxPorIpress(idIpress: string, nombre:string) {
    return this.http.delete(`${this.base_url}/${this.bd}/ipress/eliminarupsaux/${idIpress}/${nombre}`);
  }
}
