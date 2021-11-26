import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Inmunizaciones} from "../../../models/plan-atencion-integral/plan-atencion-integral.model"


@Injectable({
  providedIn: 'root'
})

export class InmunizacionesService {
  
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }
  getListaInmunizaciones(dni: string){
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/inmunizacion/${dni}`);
  }
}
