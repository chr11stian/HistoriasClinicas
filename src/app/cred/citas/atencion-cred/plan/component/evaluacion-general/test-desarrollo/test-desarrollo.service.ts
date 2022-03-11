import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../../../../../../environments/environment";

@Injectable({
   providedIn: 'root'
})
export class TestDesarrollo {
   base_url = environment.baseUrl;
   bd = environment.bd;
   constructor(private http: HttpClient) { }

   getImagenes() {
      return this.http.get<any>('/assets/data/test-desarollo-img.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
   }
   /** SERVICIOS DE TEST PERUANO**/
   listarTestPeruanoPlan(nroDoc){
      return this.http.get(`${this.base_url}/${this.bd}/cred/evaluacion/desarrollo/0/30/meses/listar/${nroDoc}`);
   }
}
