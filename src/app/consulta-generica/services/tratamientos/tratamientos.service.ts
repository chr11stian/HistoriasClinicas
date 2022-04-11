import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  urlTx=environment.base_urlTx
  headers = new Headers();
  evento: boolean = false;
  constructor(private http: HttpClient) { }

  addTratamientos(idConsulta, data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/agregarTratamiento/${idConsulta}`, data)
  }

  updateTratamientos(idConsulta, data) {
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/actualizarTratamiento/${idConsulta}`, data)
  }

  deleteTratamiento(idConsulta,idMedicamento) {
    return this.http.delete(`${this.base_url}/${this.bd}/consultageneral/eliminarTratamiento/${idConsulta}/${idMedicamento}`)
  }

  getTratamiento(idConsulta){
    return this.http.delete(`${this.base_url}/${this.bd}/consultageneral/listarTratamiento/${idConsulta}`)
  }
  printReceta(idConsulta:any){
    let username:'reporte';
    let password:'reporte@2022';

    const headers=new HttpHeaders();

    headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

    const params = new HttpParams({
          fromObject:{
            idConsulta:idConsulta
          }
        }
    )
    return this.http.get(`${this.urlTx}/jasperserver/rest_v2/reports/Reports/RECETA/recetas.pdf`,{params,headers})
  }

}
