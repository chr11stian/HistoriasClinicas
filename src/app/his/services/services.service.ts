import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HISService {
  urlServer = environment.baseUrl
  bd = environment.bd

  constructor(private http: HttpClient) { }
  getListaUpsAux(idConsulta: string) {
    return this.http.get(`${this.urlServer}/${this.bd}/his/generar/lista/upsAux/his/${idConsulta}`);
  }
  generarHisPorUpsAux(upsAux: string,idConsulta:string) {
    const params =new HttpParams({
      fromObject:{
        upsAux:upsAux
      }
    })
    return this.http.get(`${this.urlServer}/${this.bd}/his/generar/${idConsulta}`,{params});
  }
  saveHis(data:any){
    return this.http.post(`${this.urlServer}/${this.bd}/his/guardar/`, data)
  }
  updateHis(idHis:string,data:any){
    return this.http.post(`${this.urlServer}/${this.bd}/his/actualizar/${idHis}/`, data)
  }
  getListHisForUpsAux(upsAux:string){
    const params =new HttpParams({
      fromObject:{
        upsAux:upsAux
      }
    })
    return this.http.get(`${this.urlServer}/${this.bd}/his/listar/por/ups/`,{params});
  }


}
