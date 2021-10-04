import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedServiciosSaludService {
  
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getRedServiciosSalud(){
    return this.http.get(`${this.base_url}/${this.bd}/api/redserviciossalud`)
  }
}
