import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CieService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getCIEByDescripcion(item) {
    return this.http.get(`${this.base_url}/${this.bd}/cie10his/filtro/${item}`)
  }

  getCIEByCod(codCIE) {
    return this.http.get(`${this.base_url}/${this.bd}/cie10his/buscar/${codCIE}`)
  }

  getCIEByDescripcionTipo(tipo, text) {
    return this.http.get(`${this.base_url}/${this.bd}/cie10his/filtro/tipo/${tipo}/${text}`)
  }

  getPromiseCIEbyDescripcionTipo(tipo, text) {
    return this.http.get(`${this.base_url}/${this.bd}/cie10his/filtro/tipo/${tipo}/${text}`)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }
}
