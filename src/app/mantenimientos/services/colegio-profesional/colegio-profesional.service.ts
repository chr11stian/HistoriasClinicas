import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ColegioProfesional } from 'src/app/core/models/mantenimiento.models';

@Injectable({
  providedIn: 'root'
})
export class ColegioProfesionalService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}

  getColegioProfesional() {
    return this.http.get(`${this.base_url}/${this.bd}/api/colegioprofesional`);
  }
  createColegioProfesional(colegio){
    return this.http.post<ColegioProfesional>(`${this.base_url}/${this.bd}/api/colegioprofesional/insert`, colegio).subscribe(data=>{
      console.log(data);
  });
  }
}
