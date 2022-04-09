import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  base_uri_ = environment.base_uri_;
  bd = environment.bd;

  tipoDoc: string = "";
  nroDoc: string = "";
  idConsulta: string= ""
  data: any;

  constructor(private http: HttpClient) {
  }

  getListUsuarios(idIpress) {
    const url = `${this.base_uri_}/accesos/user/lista/${idIpress}`
    return this.http.get(url)
  }

  crearUsuario(data) {
    const url = `${this.base_uri_}/accesos/user`
    return this.http.post(url, data)
  }

  updatePassword(dni: string, data) {
    const url = `${this.base_uri_}/accesos/user/${dni}`
    return this.http.post(url, data)
  }

  updatePermissos(dni: string, data) {
    const url = `${this.base_uri_}/accesos/user/app/${dni}`
    return this.http.post(url, data)
  }

}