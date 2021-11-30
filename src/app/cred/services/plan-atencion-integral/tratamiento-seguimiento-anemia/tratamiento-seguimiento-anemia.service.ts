import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TratamientoSeguimientoAnemiaService {

  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  getListaTratamientos(dni: string){
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/tratamiento_anemia/${dni}`);
  }
}
