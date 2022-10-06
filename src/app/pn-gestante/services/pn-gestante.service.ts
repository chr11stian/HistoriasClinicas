import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PnGestanteService {
  couch: boolean = false;
  bd = environment.bd_pn_gestante;
  base_url = environment.base_url_Couch;
  base_url_view = environment.base_url_couch_pngestante_view;
  id_ipress="";
  dni_profesional="";
  token =JSON.parse(localStorage.getItem("token")).tokenCouch;
  
  constructor(private http: HttpClient) {
    this.id_ipress= JSON.parse(localStorage.getItem('usuario')).ipress.renipress;
    this.dni_profesional = JSON.parse(localStorage.getItem('usuario')).nroDocumento;
  }
  getToken() {
    return this.token;
  }

  getAnio():string{
  let fecha_hoy=new Date();
  let anio=fecha_hoy.getFullYear();
  return anio.toString();
  }

  getIdPersonal():string{
    return this.dni_profesional;
  }

  getIdIpress():string{
    return this.id_ipress;
  }

  mostrarPadronGestantes(cod_ipress:string){
    return this.http.post<any []>(
      `${this.base_url_view}/PN_gestanteXipress`,
      {
        "keys": [`${cod_ipress}`],
      })
    }

  addGestante(pn_gestante: any) {
    return this.http.post(`${this.base_url}/${this.bd}`, pn_gestante);
  }

  updatedGestante(
    id: string,
    updatedPnGestante:any,
    revision: string
  ) {
    return this.http.put(`${this.base_url}/${this.bd}/${id}`, updatedPnGestante, {
      params: {
        rev: revision,
      },
    });
  }

  getGestante(dni:string){
    //implementar una vista para traer gestante del padron
  }

}
