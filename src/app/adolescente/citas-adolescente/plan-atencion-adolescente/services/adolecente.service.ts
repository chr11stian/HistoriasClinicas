import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdolecenteService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  getProblemas(dniPaciente) {
    return this.http.get(`${this.base_url}/${this.bd}/adolecentes/problemas/listar/problemasCronicos/${dniPaciente}`);
  }
  addProblema(dniPaciente, inputProblema: any) {
    return this.http.post(`${this.base_url}/${this.bd}/adolecentes/problemas/guardar/cronicos/${dniPaciente}`, inputProblema);
  }
  getProblemasAgudo(dniPaciente) {
    return this.http.get(`${this.base_url}/${this.bd}/adolecentes/problemas/listar/problemasAgudos/${dniPaciente}`);
  }
  addProblemaAgudo(dniPaciente, inputProblemaCronico: any) {
    return this.http.post(`${this.base_url}/${this.bd}/adolecentes/problemas/guardar/agudo/${dniPaciente}`, inputProblemaCronico);
  }
}
