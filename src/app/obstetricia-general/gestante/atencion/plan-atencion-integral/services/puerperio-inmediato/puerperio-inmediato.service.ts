import { Injectable } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PuerperioInmediatoService {
  tamanio:number=0;
  base_url = environment.baseUrl;

  bd = environment.bd;
  constructor(private http:HttpClient) {}

  getPuerperioService2(id) {
    return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarpuerperio/${id}`);
  }
  addPuerperioService2(id,dataPuerperio) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/filiacion/guardarpuerperio/${id}`,dataPuerperio);
  }
  editPuerperioService(id,dataPuerperio){
    return this.http.post<any>(`${this.base_url}/${this.bd}/filiacion/guardarpuerperio/${id}`,dataPuerperio);
  }



}