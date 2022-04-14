import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TratamientosSuplementacionService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {
  }
  PostSuplementacion(idConsulta,data){
    return this.http.post(`${this.base_url}/${this.bd}/consultageneral/agregarSuplementacion/${idConsulta}`,data)
  }
}
