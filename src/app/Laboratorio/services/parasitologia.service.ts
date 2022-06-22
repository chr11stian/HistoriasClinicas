import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParasitologiaService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http:HttpClient) { }
  // servicios para laboratorios de parasitologia
  PostParasitologia(id,data){
    return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/parasitologia/${id}`,data)
  }
  // servicios para laboratorio de uroanalisis
  PostOrina(id,data){
    // :localhost:3012/api/hce/examenesAuxiliares/uroanalisis/{laboratorio}
    return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/uroanalisis/${id}`,data)
  }
  getOrina(idLaboratorio:string){
    return this.http.get(`${this.base_url}/${this.bd}/examenesAuxiliares/buscar/id/${idLaboratorio}`)
  }
}

