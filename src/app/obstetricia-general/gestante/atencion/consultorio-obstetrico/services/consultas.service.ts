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
    guardarDiagnosticoDeGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
    }
    eliminarDiagnosticoGestante(nroHcl,nroEmbarazo,nroAtencion,cie10SIS){
        return this.http.delete(`${this.base_url}/${this.bd}/obstetricia/consulta/eliminiarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}/${cie10SIS}`)
    }
    guardarInmunizacionGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
    }
    editarInmunizacionGestante(nroHcl,nroEmbarazo,nroAtencion,data){
        return this.http.put(`${this.base_url}/${this.bd}/obstetricia/consulta/agregarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`, data)
    }
    eliminarInmunizacionGestante(nroHcl,nroEmbarazo,nroAtencion){
        return this.http.delete(`${this.base_url}/${this.bd}/obstetricia/consulta/eliminiarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`)
    }
    listarDignosticosDeUnaConsulta(nroHcl,nroEmbarazo,nroAtencion){
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/consulta/listarDiagnostico/${nroHcl}/${nroEmbarazo}/${nroAtencion}`);
    }
}
