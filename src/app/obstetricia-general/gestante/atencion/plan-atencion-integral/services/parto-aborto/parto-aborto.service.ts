import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PartoAbortoService {
  base_url = environment.baseUrl;
  // bd = environment.bd;
  bd = "historiasclinicas";

  constructor(private http:HttpClient) { }
  addPartoAborto(inputParto:any,idPaciente:string) {
    return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarparto-aborto/${idPaciente}`,inputParto);
  }
}
