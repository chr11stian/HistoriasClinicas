import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../../models/usuarios.models";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private _refresh = new Subject<void>();
    private baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) {
    }

    get refresh() {
        return this._refresh;
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
    }

    agregarUsuarios(personal: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, personal)
            .pipe(
                tap(() => {
                    this._refresh.next();
                })
            )
    }


    actualizarUsuarios(personal: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${personal.id}`, personal)
            .pipe(
                tap(() => {
                    this._refresh.next();
                })
            )
    }

    getUsuariosPorId(id: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`);
    }

    borrarUsuarios(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/usuarios/${id}`);
    }
}
