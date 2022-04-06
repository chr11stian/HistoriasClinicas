import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportesHisServicesService {
  urlServer = environment.baseUrl
  bd = environment.bd
  constructor(private http: HttpClient) { }

    getListHisForUpsAuxFecha(fecha,upsAux:string){
        const params =new HttpParams({
            fromObject:{
                upsAux:upsAux
            }
        })
        return this.http.post(`${this.urlServer}/${this.bd}/his/listar/his/por/ups`,fecha,{params});
    }

}

