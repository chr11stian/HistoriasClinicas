import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosGeneralesPartoService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getDatosGeneralesById(id) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/planparto/obtener/datosGenerales/${id}`)
  }
  postDatosGenerales(id, data) {
    return this.http.post(`${this.base_url}/${this.bd}/obstetricia/planparto/guardar/datosGenerales/${id}`, data)
  }
  getConsultaExistePlanParto(id) {
    return this.http.get(`${this.base_url}/${this.bd}/obstetricia/planparto/existe/${id}`)
  }
}
