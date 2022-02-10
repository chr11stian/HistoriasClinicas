import { Injectable } from '@angular/core';
import {environment} from "../../../../../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TepsiService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }
  getTablaPuntaje(edad:number) {
    return this.http.get(`${this.base_url}/${this.bd}/cred/tepsi/tablapuntaje/${edad}`);
  }
  addRegistroTepsi(nroDNI:string,inputRequest){
    return this.http.post(`${this.base_url}/${this.bd}/cred/add/tepsi/${nroDNI}`,inputRequest);
  }
}
