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
  PostParasitologia(id,data){
    return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/parasitologia/${id}`,data)
  }
}

