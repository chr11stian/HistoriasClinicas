import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LaboratoriosService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }
    getSolicitudLaboratorio(idIpres, data) {
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/listar/examen/laboratorio/${idIpres}`, data)
    }

    guardarLaboratorioHematologico(idSolicitudLaboratorio, data) {
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/hematologia/${idSolicitudLaboratorio}`, data)
    }

    guardarLaboratorioInmunologico(idSolicitudLaboratorio, data) {
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/inmunologia/${idSolicitudLaboratorio}`, data)
    }

    guardarLaboratorioBioquimica(idSolicitudLaboratorio, data) {
        return this.http.post(`${this.base_url}/${this.bd}/examenesAuxiliares/bioquimica/${idSolicitudLaboratorio}`, data)
    }
}
