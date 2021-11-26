import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecienNacidoService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getRecienNacidoById(idRecienNacido) {
    return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarreciennacido/${idRecienNacido}`)
  }
  postRecienNacido(idRecienNacido, data) {
    return this.http.post(`${this.base_url}/${this.bd}/filiacion/guardarreciennacido/${idRecienNacido}`, data)
  }
}
