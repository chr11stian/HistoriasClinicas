import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AntecedentePersonalesService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }


  getDatosGenerales(dni:string){
    return this.http.get(`${this.base_url}/${this.bd}/cred/antecedentes/personales/${dni}`);
  }
}
