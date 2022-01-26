import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ControlCrecimientoService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }
  getPaciente(dni: string){
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/recuperardatos/${dni}`);
  }

  getListaControles(dni: string){
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/control/${dni}`);
  }
  updateListaControlCrecimiento(dni: string,inputRequest){
    return this.http.put<any>(`${this.base_url}/${this.bd}/cred/update_control/${dni}`,inputRequest);
  }

}
