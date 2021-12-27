import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getEspecialidad() {
    return this.http.get(`${this.base_url}/${this.bd}/especialidad`);
  }
  createEspecialidad(especialidad){
    return this.http.post<any>(`${this.base_url}/${this.bd}/especialidad`, especialidad)
  }
  deleteEspecialidad(id){
    return this.http.delete(`${this.base_url}/${this.bd}/especialidad/${id}`)
  }
  editEspecialidad(especialidad){
    return this.http.put<any>(`${this.base_url}/${this.bd}/especialidad`, especialidad)
  }
}
