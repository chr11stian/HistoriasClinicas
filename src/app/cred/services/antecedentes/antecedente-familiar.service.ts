import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteFamiliarService {

  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }

  getDatosGenerales(dni:string){
    return this.http.get(`${this.base_url}/${this.bd}/cred/antecedentes/familiares/listar/${dni}`);
  }
  addAntecedentesFamiliares(dni:string){
    return this.http.get(`${this.base_url}/${this.bd}/cred/antecedentes/familiares/agregar/${dni}`);
  }
  updateAntecedentesFamiliares(dni:string){
    return this.http.get(`${this.base_url}/${this.bd}/cred/antecedentes/familiares/modificar/${dni}`);
  }
}