import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AdultoMayorService {
    base_url = environment.baseUrl;
    bd = environment.bd;
    constructor(private http: HttpClient) { }

    /***************DATOS GENERALES*********************/
    getDatosGeneralesAdultoMayor(tipoDoc,nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/buscardatosgenerales/${tipoDoc}/${nroDoc}`);
    }
    postDatosGeneralesAdultoMayorByDoc(tipoDoc,nroDoc,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/guardardatosgenerales/${tipoDoc}/${nroDoc}`,data);
    }
    postDatosGeneralesAdultoMayorById(idFiliacion,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/guardardatosgenerales/${idFiliacion}`,data);
    }
    /*******************ANTECEDENTES ADULTO MAYOR****************/
    getAntecedentesAdultoMayorByDoc(tipoDoc,nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/buscarantecedentes/${tipoDoc}/${nroDoc}`)
    }
    getAntecedentesAdultoMayorById(idFiliacion){
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/buscarantecedentes/${idFiliacion}`)
    }
    postAntecedentesAdultoMayorByDoc(tipoDoc,nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/guardarantecedentes/${tipoDoc}/${nroDoc}`)
    }
    postAntecedentesAdultoMayorById(idFiliacion){
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/guardarantecedentes/${idFiliacion}`)
    }

    /*****************VALORACION CLINICA*********************/
    getValoracionClinica(idFiliacion){
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/listar/${idFiliacion}`);
    }
    postValoracionClinica(idFiliacion,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/agregar/${idFiliacion}`,data);
    }
    updateValoracionClinica(idFiliacion,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/actualizar/${idFiliacion}`,data);
    }



}

