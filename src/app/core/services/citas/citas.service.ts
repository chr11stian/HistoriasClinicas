import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }

  listarCitasXservicio(data,idIpress){
    return this.http.post(`${this.base_url}/${this.bd}/cupo/listar/citas/servicio/${idIpress}`, data)
  }

  cancelarCita(data){
    return this.http.post(`${this.base_url}/${this.bd}/cupo/cancelarProxCita`, data)
  }

}
