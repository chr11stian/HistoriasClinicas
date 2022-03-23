import { Injectable } from '@angular/core';
import { environment } from "../../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ConsultasService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    getConsultas(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar`, data)
    }

    addConsultas(nroFetos, data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarConsulta/${nroFetos}`, data)
    }
    updateConsultas(nroFetos, data) {
        return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarConsulta/${nroFetos}`, data);
    }
    getConsultaPrenatalByEmbarazo(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar/`, data);
    }
    getInterrogatorioByEmbarazo(data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscarInterrogatorio`, data);
    }
    getUltimaConsultaById(idConsulta) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/numeroUltimaConsultaxid`, idConsulta)
    }
    getLastConsulById(idConsulta) {
        const promise = this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/numeroUltimaConsultaxid`, idConsulta).toPromise();
        return promise;
    }

    getInterrogatorioById(consulta) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscarInterrogatorioxid`, consulta)
    }

    getUltimaConsultaControl(nroHcl) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/numeroUltimaConsulta`, nroHcl)
    }
    getCronogramaGestante(nroHcl){
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/cronograma/${nroHcl}`)
    }
    getPrestaciones(){
        return this.http.get(`${this.base_url}/${this.bd}/sis/prestacion/listar`)
    }
    getServiciosPorIpress(idIpress) {
        return this.http.get(`${this.base_url}/${this.bd}/ipress/listarServicios/${idIpress}`);
    }


    //diagnosticos
    guardarDiagnosticoDeGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
    }
    actualizarDiagnosticoDeGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
    }
    eliminarDiagnosticoGestante(nroHcl,nroEmbarazo,nroAtencion,cie10SIS){
        return this.http.delete(`${this.base_url}/${this.bd}/obstetricia/consulta/eliminarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}/${cie10SIS}`)
    }

     //inmunizaciones
    guardarInmunizacionGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/inmunizacion/agregar/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    editarInmunizacionGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.put(`${this.base_url}/${this.bd}/inmunizacion/actualizarPendiente/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    eliminarInmunizacionGestante(idInmu){
        return this.http.delete(`${this.base_url}/${this.bd}/inmunizacion/${idInmu}`)
    }

    //tratamientos
    guardarTratamientoGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarTratamiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    editarTratamientoGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarTratamiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    eliminarTratamientoGestante(nroHcl,nroEmbarazo,nroAtencion,id){
        return this.http.delete(`${this.base_url}/${this.bd}/obstetricia/consulta/eliminarTratamiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}/${id}`)
    }

     //listar
    listarDiagnosticosDeUnaConsulta(nroHcl,nroEmbarazo,nroAtencion){
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/consulta/listarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    listarInmunizacionesDeUnaConsulta(nroHcl,nroEmbarazo,nroAtencion){
        return this.http.get(`${this.base_url}/${this.bd}/inmunizacion/${nroHcl}/${nroEmbarazo}/${nroAtencion}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    listarTratamientosDeUnaConsulta(nroHcl,nroEmbarazo,nroAtencion){
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/consulta/listarTratamiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }

    listaUpsHis(data){
        return this.http.post(`${this.base_url}/${this.bd}/ipress/listarups_his`,data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    listaUps(id){
        return this.http.get(`${this.base_url}/${this.bd}/ipress/listarServicios/${id}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }

    listarResumen(data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/listaprocedimientos`,data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
}
