import { Injectable } from '@angular/core';
import {environment} from "../../../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TamizajesService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getTamizajePlan(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/ficha-tamizaje/plan/${nroDoc}`);
  }
  searchTamizaje(idTamizaje){
    return this.http.get(`${this.base_url}/${this.bd}/cred/ficha-tamizaje/${idTamizaje}`)
  }

}
