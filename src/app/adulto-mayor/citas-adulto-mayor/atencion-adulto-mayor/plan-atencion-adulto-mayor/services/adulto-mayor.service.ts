import { Injectable } from '@angular/core';
import {environment} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AdultoMayorService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    /***********RECUPERAR DATOS DE PACIENTE DE LA BD ***/
    getPacienteNroDoc(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarpaciente/${tipoDoc}/${nroDoc}`)
    }

    /***************DATOS GENERALES*********************/
    getDatosGeneralesAdultoMayor(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/buscardatosgenerales/${tipoDoc}/${nroDoc}`);
    }

    postDatosGeneralesAdultoMayorByDoc(tipoDoc, nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/guardardatosgenerales/${tipoDoc}/${nroDoc}`, data);
    }

    postDatosGeneralesAdultoMayorById(idFiliacion, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/guardardatosgenerales/${idFiliacion}`, data);
    }

    /*******************ANTECEDENTES ADULTO MAYOR****************/
    getAntecedentesAdultoMayorByDoc(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/buscarantecedentes/${tipoDoc}/${nroDoc}`);
    }

    getAntecedentesAdultoMayorById(idFiliacion) {
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/buscarantecedentes/${idFiliacion}`);
    }

    postAntecedentesAdultoMayorByDoc(tipoDoc, nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/guardarantecedentes/${tipoDoc}/${nroDoc}`, data);
    }

    postAntecedentesAdultoMayorById(idFiliacion, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/guardarantecedentes/${idFiliacion}`, data);
    }

    /*****************VALORACION CLINICA*********************/
    getValoracionClinica(idFiliacion) {
        return this.http.get(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/listar/${idFiliacion}`);
    }
    postValoracionClinicaPorDoc(data){
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/listar/`,data)
    }
    postValoracionClinicaMentalPorDoc(data){
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/listarValoracionMental/`,data)
    }
    postValoracionClinica(idFiliacion, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/agregar/${idFiliacion}`, data);
    }
    postValoracionClinicaAgregarPorDoc(data){
        return this.http.post(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/agregar/`, data);
    }
    updateValoracionClinica(idFiliacion, data) {
        return this.http.put(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/actualizar/${idFiliacion}`, data);
    }
    updateValoracionClinicaEditarPorDoc(data){
        return this.http.put(`${this.base_url}/${this.bd}/adultomayor/valoracionclinica/actualizar`, data);
    }

    /***********************PROBLEMAS AGUDOS*****************/
    addProblemasAgudos(nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/problemas/agregar/agudos/${nroDoc}`, data);
    }

    getProblemasAgudos(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/problemas/listar/agudos/${nroDoc}`);
    }

    putProblemasAgudosItems(nroDoc, data) {
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/problemas/agudos/agregar/${nroDoc}`, data);
    }

    /***********************PROBLEMAS CRONICOS****************/
    addProblemasCronicos(nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/problemas/agregar/cronicos/${nroDoc}`, data);
    }

    getProblemasCronicos(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/problemas/listar/cronicos/${nroDoc}`);
    }

    putProblemasCronicosItems(nroDoc, data) {
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/problemas/cronicos/agregar/${nroDoc}`, data);
    }

    /***********PLAN DE ATENCION INTEGRAL ADULTO MAYOR*********/
    addPlanGeneralFuncional(nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/general/funcional/${nroDoc}`, data)
    }

    getPlanGeneralFuncional(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/general/funcional/${nroDoc}`)
    }

    addItemsPlanGeneralFuncional(nroDoc, data) {
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/general/funcional/agregar/${nroDoc}`, data)
    }

    /**debe existir descripcion y fecha registrada para poder editar*/
    updateItemsPlanGeneralFuncional(nroDoc, data) {
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/general/funcional/editar/${nroDoc}`, data)
    }

    /****agregar inmunizaciones******/
    addPlanInmunizaciones(nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/inmunizacion/${nroDoc}`, data)
    }

    getPlanInmunizaciones(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/inmmunizacion/listar/${nroDoc}`)
    }

    addItemsImnunizaciones(nroDoc, data) {

        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/inmunizacion/agregar/${nroDoc}`, data)
    }

    updateItemsImnunizaciones(nroDoc, data) {

        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/inmunizacion/editar/${nroDoc}`, data)
    }

    /******evaluacion bucal*******/
    addEvaluacionBucal(nroDoc, data) {
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/bucal/${nroDoc}`, data)
    }

    getEvaluacionBucal(nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/bucal/lista/${nroDoc}`)
    }
    addItemsEvaluacionBucal(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/bucal/agregar/${nroDoc}`,data)
    }
    updateItemsEvaluacionBucal(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/evaluacion/bucal/editar/${nroDoc}`,data)
    }
    /*************Intervenciones********/
    addEvaluacionIntervenciones(nroDoc,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/intervenciones/preventivas/${nroDoc}`,data)
    }
    getEvaluacionIntervenciones(nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/intervenciones/preventivas/listar/${nroDoc}`)
    }
    addItemsIntervenciones(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/intervenciones/preventivas/agregar/${nroDoc}`,data)
    }
    updateItemsIntervenciones(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/intervenciones/preventivas/editar/${nroDoc}`,data)
    }
    /**************Administracion de micronutrientes*********/
    addMicronutrientes(nroDoc,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/administracion/micronutrientes/${nroDoc}`,data)
    }
    getMicronutrientes(nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/administracion/micronutrientes/listar/${nroDoc}`)
    }
    addItemsMicronutrientes(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/admistracion/micronutrientes/agregar/${nroDoc}`,data)
    }
    updateItemsMicronutrientes(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/admistracion/micronutrientes/editar/${nroDoc}`,data)
    }
    /***************Consejería Integral**********************/
    addConsejeriaIntegral(nroDoc,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/consejeria/integral/${nroDoc}`,data)
    }
    getConsejeriaIntegral(nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/consejeria/integral/listar/${nroDoc}`)
    }
    addItemsConsejeria(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/consejeria/integral/agregar/${nroDoc}`,data)
    }
    updateItemsConsejeria(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/consejeria/integral/editar/${nroDoc}`,data)
    }
    /***************Visita domiciliaria*******************/
    addVisitaDomiciliaria(nroDoc,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/visita/domiciliaria/${nroDoc}`,data)
    }
    getVisitaDomiciliaria(nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/visita/domiciliaria/listar/${nroDoc}`)
    }
    addItemsVisitaDomiciliaria(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/visita/domiciliaria/agregar/${nroDoc}`,data)
    }
    updateItemsVisitaDomiciliaria(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/visita/domiciliaria/editar/${nroDoc}`,data)
    }
    /***********Agregar Temas educativos**********/
    addTemasEducativos(nroDoc,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/temas/educativos/${nroDoc}`,data)
    }
    getTemasEducativos(nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/temas/educativos/listar/${nroDoc}`)
    }
    addItemsTemasEducativos(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/temas/educativos/agregar/${nroDoc}`,data)
    }
    updateItemsTemasEducativos(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/temas/educativos/editar/${nroDoc}`,data)
    }
    /*******Agregar Prioridades Sanitarias*******/
    addPrioridadesSanitarias(nroDoc,data){
        return this.http.post(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/atencion/prioridades/${nroDoc}`,data)
    }
    getPrioridadesSanitarias(nroDoc){
        return this.http.get(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/atencion/prioridades/listar/${nroDoc}`)
    }
    addItemsPrioridadesSanitarias(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/atencion/prioridades/agregar/${nroDoc}`,data)
    }
    updateItemsPrioridadesSanitarias(nroDoc,data){
        return this.http.put(`${this.base_url}/${this.bd}/adultoMayor/atencionIntegral/atencion/prioridades/editar/${nroDoc}`,data)
    }

}
