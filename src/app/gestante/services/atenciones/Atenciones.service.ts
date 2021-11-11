import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AtencionesService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  private _atenciones: any[];

  constructor(private http: HttpClient) {}
  getAtenciones() {
    return this.http.get(this.base_url+"/all")
    //return this.http.get(`${this.base_url}/${this.bd}/api/gestanteatenciones`);
  }
  get atenciones(): any[]{
    return [this._atenciones];
  }
  agregarAtencion(atencion:any){
    this._atenciones.push(atencion);
  }

}
