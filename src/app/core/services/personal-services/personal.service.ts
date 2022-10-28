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
    base_new = environment.base_login;
    base_url = environment.baseUrl;
    base_login = environment.base_login;
    base_url_PIDE = environment.base_url_pide;
    bd = environment.bd;
    private _refresh = new Subject<void>();
    private personales: Personal[] = [];

    constructor(private http: HttpClient) { }

    getPersonal(): Observable<Personal[]> {
        return this.http.get<Personal[]>(
            `${this.base_url}/${this.bd}/personal`
        );
    }

    getPersonalIpress(idIpress: string) {
        return this.http.get(
            `${this.base_url}/${this.bd}/personal/listarpersonal/${idIpress}`
        );
    }

    getPersonalID(id): Observable<Personal> {
        return this.http.get<Personal>(
            `${this.base_url}/${this.bd}/personal/${id}`
        );
    }

    getPersonalTipoDocumento(tipo, doc): Observable<Personal> {
        return this.http.get<Personal>(
            `${this.base_url}/${this.bd}/personal/${tipo}/${doc}`
        );
    }

    createPersonal(personal): Observable<Personal> {
        return this.http.post<any>(
            `${this.base_url}/${this.bd}/personal`,
            personal
        );
    }

    deletePersonal(id) {
        return this.http.delete(`${this.base_url}/${this.bd}/personal/${id}`);
    }

    editPersonal(personal): Observable<Personal> {
        return this.http.put<any>(
            `${this.base_url}/${this.bd}/personal`,
            personal
        );
    }

    createPersonalEspecialidad(id, reqEspecialidad) {
        return this.http.put<any>(
            `${this.base_url}/${this.bd}/personal/ingresarespecialidad/${id}`,
            reqEspecialidad
        );
    }

    deletePersonalEspecialidad(id, nombreEspecialidad) {
        return this.http.delete<any>(
            `${this.base_url}/${this.bd}/personal/eliminarespecialidad/${id}/${nombreEspecialidad}`
        );
    }

    editPersonalEspecialidad(id, reqEspecialidad) {
        return this.http.put<any>(
            `${this.base_url}/${this.bd}/personal/actualizarespecialidad/${id}`,
            reqEspecialidad
        );
    }

    //otros
    getPorIpressUps(reqInput: any) {
        return this.http.post<any>(
            `${this.base_url}/${this.bd}/personal/personalservicio`,
            reqInput
        );
    }

    //roles del personal
    addRolesPersonal(idPersonal, reqInput: any) {
        return this.http.put(
            `${this.base_url}/${this.bd}/personal/ingresarrol/${idPersonal}`,
            reqInput
        );
    }

    deleteRol(idPersonal, idUPS) {
        return this.http.delete<any>(
            `${this.base_url}/${this.bd}/personal/eliminarrol/${idPersonal}/${idUPS}`
        );
    }

    editRol(idPersonal, reqRol) {
        return this.http.put<any>(
            `${this.base_url}/${this.bd}/personal/actualizarrol/${idPersonal}`,
            reqRol
        );
    }

    //traer sexo
    getSexos() {
        return this.http.get<any>(`${this.base_url}/${this.bd}/tools/genero`);
    }

    getDatosReniec(doc) {
        return this.http.get(
            `${this.base_url}/${this.bd}/pide/datos-sis/${doc}`
        );
    }

    //roles
    listServiceStaff(dni) {
        return this.http.get(
            `${this.base_url}/hce/personal/listarroles/DNI/${dni}`
        );
    }

    resetPass(dni, data) {
        return this.http.put(
            `${this.base_new}/accesos/user/reset-pass/hce/${dni}`,
            data
        );
    }

    saveRol(data) {
        return this.http.post(`${this.base_new}/accesos/user/hce`, data);
    }

    updateRol(dni, data) {
        return this.http.put(`${this.base_new}/accesos/user/hce/${dni}`, data);
    }

    getRoles(dni) {
        return this.http.get(`${this.base_new}/accesos/user/hce/${dni}`);
    }

    getListAdmin() {
        return this.http.get(`${this.base_login}/admins/listar`);
    }
    //--desactivar y activar personal
    desactivarPersonal(idPersona) {
        return this.http.delete<any>(
            `${this.base_url}/${this.bd}/personal/desactivar/${idPersona}`
        );
    }

    activarPersonal(idPersonal) {
        return this.http.put(
            `${this.base_url}/${this.bd}/personal/activar/${idPersonal}`,
            ""
        );
    }

    searchPersonal(dni) {
        return this.http.get(
            `${this.base_url}/${this.bd}/personal/findByDocRegistrado/${dni}`
        );
    }
    /* crearRol(data) {
        return this.http.post(`${this.base_uri_}/accesos/user`, data);
    }

    updatePassword(dni, data) {
        return this.http.put(`${this.base_uri_}/accesos/user/${dni}`, data);
    } */
    getPidePersonalData(nroDoc: string) {
        return this.http.get<any>(`${this.base_url}/${this.bd}/pide/consultar/${nroDoc}`)
            .toPromise()
            .then(res => <any>res)
            .then(data => { return data; })
            .catch(error => { return error.error });
    }
}
