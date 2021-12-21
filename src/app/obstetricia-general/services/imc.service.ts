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

  getGananciaSobrePeso(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaSobrePeso/${semanas}`)
  }
  getGananciaObesa(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaObesa/${semanas}`)
  }
  getGananciaPesoRegular(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaPesoRegular/${semanas}`)
  }
  getGananciaBajoPeso(semanas) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/recomendacionGananciaBajoPeso/${semanas}`)
  }
  getClasificacionEstadoNutricionalByTalla(talla) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/imc/clasificaionEstadoNutricionalIMCPG/${talla}`)
  }
}
