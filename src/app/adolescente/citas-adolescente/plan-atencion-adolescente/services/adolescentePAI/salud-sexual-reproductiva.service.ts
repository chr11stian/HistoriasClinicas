import { Injectable } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SaludSexualReproductivaService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http:HttpClient) { }
  getSalud(tipoDNI:string,dniPaciente:string) {
    return this.http.get(`${this.base_url}/${this.bd}/adolescentes/buscarsaludsexual/${tipoDNI}/${dniPaciente}`);
  }
  saveSalud(tipoDNI:string,dniPaciente:string,requestInput) {
    return this.http.post(`${this.base_url}/${this.bd}/adolescentes/guardarsaludsexual/${tipoDNI}/${dniPaciente}`,requestInput);
  }

}
