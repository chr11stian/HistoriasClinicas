import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListaConsultaService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  tipoDoc: string = "";
  nroDoc: string = "";
  data: any;

  constructor(private http: HttpClient) {
  }

  getConsultasCRED(dni) {
    //return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar/`, data)
    return this.http
        .get<any>('assets/data/consultas.json')
  }
}
