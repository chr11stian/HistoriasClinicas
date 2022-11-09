import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { VisitasProfesionalNinios } from "../interfaces/visita_profesional_ninios";
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

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
    constructor(private http: HttpClient,private sanitizer: DomSanitizer) {}
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
    /**
     * 
    let reader= new FileReader();
    reader.readAsDataURL(data);
    reader.onload=()=>{
        //aqui ya esta en base64
        let x=reader.result;
    }
     */
//     getImageURL(id: string){
//     var url=`${this.base_url_images}/${id}`;
//     const headers = new HttpHeaders({'Authorization': "Bearer " + this.getToken(), 'Content-Type': 'image/*'});
//     return this.http.get(url,{headers,responseType:'blob'});
//    }
    

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

    getImage(id:string,token:string):any{
        const headers = new HttpHeaders(`{'Authorization': "Bearer " ${token}, 'Content-Type': 'image/*'}`); 
        let blob:any=this.http
            .get(`${this.base_url_images}/${id}`, {responseType: 'blob'})
        return blob;
    }
}
