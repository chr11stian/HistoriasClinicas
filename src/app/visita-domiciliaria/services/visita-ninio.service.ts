import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { VisitasProfesionalNinios } from "../interfaces/visita_profesional_ninios";

@Injectable({
    providedIn: "root",
})
export class VisitaNinioService {
    bd = environment.bdCouch;
    base_url = environment.base_url_Couch;
    base_url_view = environment.base_url_couch_view;

    constructor(private http: HttpClient) {}

    getVisitasNiniosXProfesionalTodo(
        idIpress: string,
        dni_profesional: string
    ) {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url_view}/VPN_XProfesionalTodo`,
            {
                keys: [[idIpress, dni_profesional]],
            }
        );
    }

    getVisitasNiniosXProfesionalAnio(
        idIpress: string,
        dni_profesional: string,
        anio: string
    ) {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url_view}/VPN_ProXAnio`,
            {
                keys: [[idIpress, dni_profesional, anio]],
            }
        );
    }

    getVisitasNiniosXProfesionalMenores_4_Meses(
        idIpress: string,
        dni_profesional: string,
        anio: string
    ) {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url_view}/VPN_menores_4_meses`,
            {
                keys: [[idIpress, dni_profesional, anio]],
            }
        ).toPromise()
        .then((res) => <any[]>res)
        .then((data) => {
        return data;
        });
    }

    getVisitasNiniosXProfesionalMayores_4_Meses(
        idIpress: string,
        dni_profesional: string,
        anio: string
    ) {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url_view}/VPN_mayores_4_meses`,
            {
                keys: [[idIpress, dni_profesional, anio]],
            }
        ).toPromise()
        .then((res) => <any[]>res)
        .then((data) => {
        return data;
        });
    }

    getVisitasNiniosXProfesionalMenores_4_MesesFecha(
        idIpress: string,
        dni_profesional: string,
        anio_mes: string
    ) {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url_view}/VPN_menores_4_meses_fecha`,
            {
                keys: [[idIpress, dni_profesional, anio_mes]],
            }
        ).toPromise()
        .then((res) => <any[]>res)
        .then((data) => {
        return data;
        });
    }

    getVisitasNiniosXProfesionalMayores_4_MesesFecha(
        idIpress: string,
        dni_profesional: string,
        anio_mes: string
    ) {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url_view}/VPN_mayores_4_meses_fecha`,
            {
                keys: [[idIpress, dni_profesional, anio_mes]],
            }
        ).toPromise()
        .then((res) => <any[]>res)
        .then((data) => {
        return data;
        });
    }

    getVisitasNiniosXProfesionalXAnioXMesFecha(
        idIpress: string,
        dni_profesional: string,
        anio_mes: string
    ) {
        return this.http.post<VisitasProfesionalNinios[]>(
            `${this.base_url_view}/VPN_ProXAnioXMes`,
            {
                keys: [[idIpress, dni_profesional, anio_mes]],
            }
        );
    }

    cargarVisitasAnio(){
        
    }
}
