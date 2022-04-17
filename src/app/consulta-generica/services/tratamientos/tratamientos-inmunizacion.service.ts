import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TratamientosInmunizacionService {
  base_url=environment.baseUrl
  bd=environment.bd

  constructor(private http:HttpClient) {
  }
  getUnmunizaciones(idConsulta){
    return this.http.get(`${this.base_url}/${this.bd}/inmunizacion/consulta/${idConsulta}`)
  }
  postInmunizacion(inputRequest){
    return this.http.post(`${this.base_url}/${this.bd}/inmunizacion/registrarCredDirecto`,inputRequest)
  }

}
