import { Injectable } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PuerperioInmediatoService {

  base_url = environment.baseUrl;
  // bd = environment.bd;
  bd = environment.bd;
  constructor(private http:HttpClient) {}

  recuperarPuerperioService(tipoDoc, nroDoc,dataPuerperio) {
    return this.http.put(`${this.base_url}/${this.bd}/filiacion/guardarpuerperio/${tipoDoc}/${nroDoc}`,dataPuerperio);
  }
  addPuerperioService(tipoDoc, nroDoc, dataPuerperio) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/filiacion/guardarpuerperio/${tipoDoc}/${nroDoc}`,dataPuerperio);
  }

}