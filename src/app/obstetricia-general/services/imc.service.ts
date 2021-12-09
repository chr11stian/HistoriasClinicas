import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImcService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getGananciaPesoRegular(week) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaPesoRegular/${week}`)
  }
}
