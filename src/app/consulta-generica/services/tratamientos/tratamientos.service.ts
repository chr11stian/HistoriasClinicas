import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  base_url = environment.baseUrl;
  bd = environment.bd;

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

}
