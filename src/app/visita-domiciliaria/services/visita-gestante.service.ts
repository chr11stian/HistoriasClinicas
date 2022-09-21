import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VisitasProfesionalGestantes } from '../interfaces/visita_profesional_gestantes';

@Injectable({
  providedIn: 'root'
})
export class VisitaGestanteService {
  bd = environment.bdCouch;
  base_url = environment.base_url_Couch;
  base_url_view=environment.base_url_couch_view;

  constructor(private http: HttpClient) {}

  getVisitasGestantesXProfesional(dni_profesional: string) {
  return this.http.post<VisitasProfesionalGestantes[]>(
    `${this.base_url_view}/visita_domiciliaria_XProfesionalGestante`,
    {
      keys: [dni_profesional],
    }
  );
}
}
