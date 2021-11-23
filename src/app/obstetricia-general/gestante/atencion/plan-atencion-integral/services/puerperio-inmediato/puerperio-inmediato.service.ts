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

  createPuerperioService(dataPuerperio) {
    return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarpuerperio`,dataPuerperio);
  }


}