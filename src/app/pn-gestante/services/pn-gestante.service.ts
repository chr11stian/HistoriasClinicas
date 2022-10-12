import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PNGestante } from '../interfaces/pn-gestante';
@Injectable({
  providedIn: 'root'
})
export class PnGestanteService {
  couch: boolean = false;
  bd = environment.bd_pn_gestante;
  base_url = environment.base_url_Couch;
  base_url_view = environment.base_url_couch_pngestante_view;
  base_url_update=environment.base_url_couch_gestante_update;
  id_ipress="";
  dni_profesional="";
  constructor(private http: HttpClient) {
  }
  getToken() {
    return JSON.parse(localStorage.getItem("token")).tokenCouch === null
        ? ""
        : JSON.parse(localStorage.getItem("token")).tokenCouch;
}

getAnio(): string {
    let fecha_hoy = new Date();
    let anio = fecha_hoy.getFullYear();
    return anio.toString();
}

getIdPersonal(): string {
    this.dni_profesional = JSON.parse(
        localStorage.getItem("usuario")
    ).nroDocumento;
    return this.dni_profesional;
}

getIdIpress(): string {
    this.id_ipress = JSON.parse(
        localStorage.getItem("usuario")
    ).ipress.renipress;
    return this.id_ipress;
}

  mostrarPadronGestantes(cod_ipress:string){
    return this.http.post<any []>(
      `${this.base_url_view}/pn-gestantes-ipress`,
      {
        "keys": [`${cod_ipress}`],
      })
    }

  addGestante(pn_gestante: PNGestante) {
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

  getGestanteDni(dni:String){
    //implementar una vista para traer gestante del padron gestantes_dni
    return this.http.post<any []>(
      `${this.base_url_view}/gestantes-dni`,
      {
        "keys": [`${dni}`],
      })
  }

  cambioEESS(id:string,nuevo_codEessActual:string,nuevo_eessActual:string){
    console.log(`${this.base_url_update}/cambiar_eess/id`);
    return this.http.put(
      `${this.base_url_update}/cambiar_eess/${id}`,
      {
        codEessActual:nuevo_codEessActual,
        eessActual:nuevo_eessActual
      })
  }

  actualizarNumeroGesta(id:string,nuevo_nroGesta:number,nuevo_fur:string,nuevo_fpp:string){
    console.log( `${this.base_url_update}/actualizar_nroGesta/${id}`);
    return this.http.put(
      `${this.base_url_update}/actualizar_nroGesta/id`,
      {
        nroGesta:nuevo_nroGesta,
        fur:nuevo_fur,
        fpp:nuevo_fpp
      })
  }

}
