import { Injectable } from '@angular/core';
import { environment } from "../../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { referencia } from 'src/app/cred/citas/models/data';

interface event {
    title: string,
    start: string | Date
}
@Injectable({
    providedIn: 'root'
})
export class ConsultasService {
    base_url = environment.baseUrl;
    bd = environment.bd;
    list: event[] = []
    referencia: referencia
    proxCita = ''

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
    //procedimientos
    guardarProcedimientoGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarProcedimiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    guardarProcedimientoGestanteConsejeria(nroHcl,nroEmbarazo,nroAtencion,consejeria,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarProcedimiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}/${consejeria}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    editarProcedimientoGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/actualizarProcedimiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    eliminarProcedimientoGestante(nroHcl,nroEmbarazo,nroAtencion,codProcedimientoHIS){
        return this.http.delete(`${this.base_url}/${this.bd}/obstetricia/consulta/eliminarProcedimiento/${nroHcl}/${nroEmbarazo}/${nroAtencion}/${codProcedimientoHIS}`)
    }

    //procedimiento de imagenes
    guardarSolicitudEcografiasGestante(id,data){
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/agregar-ProcImg/${id}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    editarSolicitudEcografiasGestante(id,data){
        return this.http.put(`${this.base_url}/${this.bd}/examenesAuxiliares/actualizarProcImgPendiente/${id}`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    eliminarSolicitudEcografiasGestante(id,data){
        return this.http.put(`${this.base_url}/${this.bd}/examenesAuxiliares/eliminarProcImgPendiente/${id}`,data)
    }
    guardarResultadoEcografiasGestante(data){
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/ecografiaObsAbdominal_EF`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    editarResultadoEcografiasGestante(data){
        return this.http.put(`${this.base_url}/${this.bd}/examenesAuxiliares/ecografiaObsAbdominal_EF`, data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    
    //buscar por id ecografia
    buscarEcografiaAbdominalId(id){
        return this.http.get(`${this.base_url}/${this.bd}/examenesAuxiliares/ecografiaObsAbdominal_EF/${id}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
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
    listarProcedimientosDeUnaConsulta(nroHcl,nroEmbarazo,nroAtencion){
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/consulta/listarProcedimientos/${nroHcl}/${nroEmbarazo}/${nroAtencion}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    listarSolicitudesEco(idConsulta){
        return this.http.get(`${this.base_url}/${this.bd}/examenesAuxiliares/listarProcImg/${idConsulta}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    listaConcluidosEco(idConsulta){
        return this.http.get(`${this.base_url}/${this.bd}/examenesAuxiliares/listarProcImgConcluido/${idConsulta}`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    listaHistorialEco(data){
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/listarProcImgConcluidoHcl`,data)
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
    
    listaResumenPendientes(data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/listarProcedimientosFaltantes`,data)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
    

    listarSubTipoImagenes(){
        return this.http.get(`${this.base_url}/${this.bd}/tools/procImagenes/subtipo`)
        .toPromise()
        .then(res => <any[]>res)
        .then(data => { return data; });
    }
}
