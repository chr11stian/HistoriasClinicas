import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
    id_ipress = "";
    dni_profesional = "";
    constructor(private http: HttpClient) {}
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

    getImageURL(id: string) {
        return `${this.base_url_images}/${id}`;
    }
}
