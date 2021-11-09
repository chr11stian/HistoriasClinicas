import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AtencionesService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) {}
  getAtenciones() {
    return this.http.get(this.base_url+"/all")
    //return this.http.get(`${this.base_url}/${this.bd}/api/gestanteatenciones`);
  }

}
