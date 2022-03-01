import { HttpClient } from '@angular/common/http';
import { Observable, pipe, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarifarioService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }

  createTarifa(request) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/tarifa`, request)
  }
  updateTarifa(request) {
    return this.http.put<any>(`${this.base_url}/${this.bd}/tarifa`, request)
  }
  cambiarEstadoTarifa(id) {
    return this.http.put<any[]>(`${this.base_url}/${this.bd}/tarifa/cambiarEstado`,{id: id});
  }
  listarTarifasIpress(idIpress){
    return this.http.get<any>(`${this.base_url}/${this.bd}/tarifa/ipress/${idIpress}`)
  }
}
