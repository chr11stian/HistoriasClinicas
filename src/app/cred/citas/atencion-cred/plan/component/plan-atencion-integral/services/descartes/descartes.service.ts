import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Descartes } from '../../models/plan-atencion-integral.model' 

export const headers = new HttpHeaders({
  "Content-Type": "application/json"
}); 

@Injectable({
  providedIn: 'root'
})
export class DescartesService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getListaDescartes(dni: string){
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/descartes/${dni}`);
  }
}
