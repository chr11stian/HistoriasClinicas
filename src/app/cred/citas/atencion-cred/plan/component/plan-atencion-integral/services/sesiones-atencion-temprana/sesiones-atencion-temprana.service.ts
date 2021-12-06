import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SesionesTempranas, AddSesionesTempranas} from '../../models/plan-atencion-integral.model' 

export const headers = new HttpHeaders({
  "Content-Type": "application/json"
}); 

@Injectable({
  providedIn: 'root'
})
export class SesionesAtencionTempranaService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getListaSesiones(dni: string){
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/sesion_atencion_temprana/${dni}`);
  }
  addNuevaSesion(dni: string, nuevo: AddSesionesTempranas){
    return this.http.post(`${this.base_url}/${this.bd}/cred/add_sesion_atencion_temprana/${dni}`,nuevo, {headers});
  }
  updateSesion(dni: string, editado: SesionesTempranas){
    return this.http.put(`${this.base_url}/${this.bd}/cred/update_sesion_atencion_temprana/ultima/${dni}`,editado, {headers});
  }
}
