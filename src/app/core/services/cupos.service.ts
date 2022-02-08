import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Injectable({
    providedIn: 'root'
})
export class CuposService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    ServicioSeleccionado = "";
    AmbienteSeleccionado = null;
    PersonalResponsableSeleccionado = null;
    FechaAtencionSeleccionado = null;
    HoraAtencionSeleccionado: any;
    dataPersonalSelecionado: any;

    modal1: DynamicDialogRef;
    modal2: DynamicDialogRef;
    modalPacientes: DynamicDialogRef;
    dataCupos: any[];

    constructor(private http: HttpClient) {
    }


    getOfertas(data) {
        return this.http.post(`${this.base_url}/${this.bd}/oferta/oferta`, data)
    }

    getTipoUPSs() {
        return this.http.get(`${this.base_url}/${this.bd}/tipoups/listar`);
    }

    getOfertasListar(data) {
        return this.http.post(`${this.base_url}/${this.bd}/oferta/listar`, data)
    }

    saveCupos(data) {
        return this.http.post(`${this.base_url}/${this.bd}/cupo/save`, data)
    }


    //Actualiza el estado de las ofertas despues de guardar un cupo LIBRE / OCUPADO
    updateEstadoOferta(data) {
        return this.http.post(`${this.base_url}/${this.bd}/oferta/actualizar-horario`, data)
    }

    //Crear las ofertas de acuerdo a los Ids de rol de guardias por servicio
    crearOfertas(data) {
        return this.http.post(`${this.base_url}/${this.bd}/oferta/crear-ofertas`, data)
    }



    getCuposServicioFecha(idipres, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cupo/buscar/servicio/${idipres}`, data)
    }

    listaCuposConfirmados(idIpres, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cupo/lista/confirmado/${idIpres}`, data)
    }

    buscarCupoPorDniFechaIpress(idIpres, data) {
        return this.http.post(`${this.base_url}/${this.bd}/cupo/buscar/${idIpres}`, data)
    }

    cambioOfertasTotal(idIpres, data) {
        return this.http.post(`${this.base_url}/${this.bd}/oferta/cambiar-personal-total/${idIpres}`, data)
    }

    updatePacienteExtras(data) {
        return this.http.put(`${this.base_url}/${this.bd}/paciente/actualizarDatos/`, data)
    }
}
