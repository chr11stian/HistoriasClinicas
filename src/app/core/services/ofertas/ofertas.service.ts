import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  // base_urlSimular = environment.baseUrlSimular;

  constructor(private http: HttpClient) {
  }

  getOfertasListar(data) {
    return this.http.post(`${this.base_url}/${this.bd}/oferta/listar`, data)
  }
  //Crear las ofertas de acuerdo a los Ids de rol de guardias por servicio
  crearOfertas(data) {
    return this.http.post(`${this.base_url}/${this.bd}/oferta/crear-ofertas`, data)
  }
  getOfertasDisponibles(data){
    return this.http.post(`${this.base_url}/${this.bd}/oferta/disponibilidad`, data)
  }
  generarOferta(data){
    return this.http.post(`${this.base_url}/${this.bd}/oferta/nueva-oferta`, data)
  }
  listarOfertasXservicio(data){
    return this.http.post(`${this.base_url}/${this.bd}/oferta/listar`, data)
  }
  agregarOfertasAunaLista(data){
    return this.http.post(`${this.base_url}/${this.bd}/oferta/agregar-cupo`, data)
  }
  buscarOfertaXPersonal(data){
    return this.http.post(`${this.base_url}/${this.bd}/oferta/buscar-ofertas-personal`, data)
  }
  
}
