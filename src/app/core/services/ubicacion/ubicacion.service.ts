import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Ubicacion } from "../../models/ubicacion.models";

@Injectable({
  providedIn: "root",
})
export class UbicacionService {
  // private _refresh = new Subject<void>();
  base_url = environment.baseUrl;
  bd = environment.bd;
  private ubicacions: Ubicacion[] = [];
  ubicacion: Ubicacion = null;

  public subjectUser = new BehaviorSubject<Ubicacion>(this.ubicacion);

  constructor(private http: HttpClient) {}

  // get refresh() {
  //     return this._refresh;
  // }

  getUbicacion() {
    return this.http
      .get<Ubicacion[]>(`${this.base_url}/historiasclinicas/ubicacion/listar`)
      .pipe(tap((ubicacions) => (this.ubicacions = ubicacions)));
  }

  // getUbicacion(): Observable<Ubicacion[]> {
  //     return this.http.get<Ubicacion[]>(`${this.base_url}/historiasclinicas/ubicacion/listar`);
  // }
}
