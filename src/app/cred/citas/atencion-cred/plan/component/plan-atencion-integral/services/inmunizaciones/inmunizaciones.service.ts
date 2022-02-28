import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})

export class InmunizacionesService {
  
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }
  // getInmunizacionesEstatico(dni:string) {
  //   // return this.http.get<any>('/assets/data/inmunizaciones.json')
  //   //   .toPromise()
  //   //   .then(res => <any[]>res.data)
  //   //   .then(data => { return data; });
  //   return this.http.get<any>(`${this.base_url}/${this.bd}/cred/inmunizacion/${dni}`);
  // }

  getListaInmunizaciones(dni: string){
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/inmunizacion/${dni}`);
  }
  postInmunizaciones(requestInput:any){
    return this.http.post<any>(`${this.base_url}/${this.bd}/cred/inmunizacion/registrarExtramural`,requestInput);
  }

  updateListaInmunizaciones(dni: string,request){
    return this.http.put<any>(`${this.base_url}/${this.bd}/cred/update_inmunizacion/${dni}`,request);
  }
}
