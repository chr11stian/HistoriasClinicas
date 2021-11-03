import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, pipe, Subject } from "rxjs";
import { tap } from "rxjs/operators";

import { Personal } from "../../../core/models/personal.models";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PersonalService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  private _refresh = new Subject<void>();
  private personales: Personal[] = [];

  constructor(private http: HttpClient) {}

  getPersonal(): Observable<Personal[]> {
    return this.http.get<Personal[]>(
      `${this.base_url}/${this.bd}/api/personal`
    );
  }
  getPersonalID(id): Observable<Personal> {
    return this.http.get<Personal>(
      `${this.base_url}/${this.bd}/api/personal/${id}`
    );
  }
  createPersonal(personal): Observable<Personal> {
    return this.http.post<any>(
      `${this.base_url}/${this.bd}/api/personal`,
      personal
    );
  }
  deletePersonal(id) {
    return this.http.delete(`${this.base_url}/${this.bd}/api/personal/${id}`);
  }
  editPersonal(personal): Observable<Personal> {
    return this.http.put<any>(
      `${this.base_url}/${this.bd}/api/personal`,
      personal
    );
  }
  createPersonalEspecialidad(id, reqEspecialidad) {
    return this.http.put<any>(
      `${this.base_url}/${this.bd}/api/personal/ingresarespecialidad/${id}`,
      reqEspecialidad
    );
  }
  deletePersonalEspecialidad(id, nombreEspecialidad) {
    return this.http.delete<any>(
      `${this.base_url}/${this.bd}/api/personal/eliminarespecialidad/${id}/${nombreEspecialidad}`
    );
  }
  editPersonalEspecialidad(id, reqEspecialidad) {
    return this.http.put<any>(
      `${this.base_url}/${this.bd}/api/personal/actualizarespecialidad/${id}`,
      reqEspecialidad
    );
  }
  //otros
  getPorIpressUps(reqInput: any) {
    return this.http.post<any>(
      `${this.base_url}/${this.bd}/api/personal/personalservicio`,
      reqInput
    );
  }
}
