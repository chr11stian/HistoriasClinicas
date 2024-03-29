import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { VisitasProfesionalNinios } from "../interfaces/visita_profesional_ninios";


@Injectable({
    providedIn: "root",
})
export class VisitaDomiciliariaService {
    couch: boolean = false;
    bd = environment.bdCouch;
    base_url = environment.base_url_Couch;
    base_url_view = environment.base_url_couch_view;
    base_url_images = environment.base_url_couch_images;
    base_getImageVisita=environment.base_getImageVisitasDomiciliaria;
    id_ipress = "";
    dni_profesional = "";
    constructor(private http: HttpClient) {}
    getToken() {
        return JSON.parse(localStorage.getItem("token")).tokenCouch === null
            ? ""
            : JSON.parse(localStorage.getItem("token")).tokenCouch;
    }

    getTokenHCE() {
        return JSON.parse(localStorage.getItem("token")).token=== null
            ? ""
            : JSON.parse(localStorage.getItem("token")).token;
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

    mostrarVisitas(): Observable<any> {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url}/${this.bd}/_find`,
            {
                selector: {
                    tipo_doc: "visita_domiciliaria_profesional",
                    tipo_ficha: "ninio_visita_profesional",
                },
            }
        );
    }

    getLatitudIpress():any{
        return JSON.parse(
            localStorage.getItem("usuario")
        ).ipress.ubicacion.latitud==null?-13.52264:JSON.parse(
            localStorage.getItem("usuario")
        ).ipress.ubicacion.latitud;
    }

    getLongitudeIpress():any{
        return JSON.parse(
            localStorage.getItem("usuario")
        ).ipress.ubicacion.longitud==null?-71.96734:JSON.parse(
            localStorage.getItem("usuario")
        ).ipress.ubicacion.longitud;
    }

    getEscalaCodIpress(){
        return JSON.parse(
            localStorage.getItem("usuario")
        ).escalas.unidades==null?"":JSON.parse(
            localStorage.getItem("usuario")
        ).escalas.unidades;
    }

    urlImagen(fileName:string):any{
    return this.http.get<any>(`${this.base_getImageVisita}/${fileName}`)
    }
}
