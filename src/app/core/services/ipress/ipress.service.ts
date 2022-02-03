import {HttpClient} from '@angular/common/http';
import {Observable, pipe, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IpressService {

    base_url = environment.baseUrl;
    bd = environment.bd;
    private _refresh = new Subject<void>();


    constructor(private http: HttpClient) {
    }

    getIpress() {
        return this.http.get<any[]>(`${this.base_url}/${this.bd}/ipress`);
    }

    getIpressID(id) {
        return this.http.get<any[]>(`${this.base_url}/${this.bd}/ipress/${id}`);
    }

    createIpress(ipress) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/ipress`, ipress)
    }

    deleteIpress(id) {
        return this.http.delete(`${this.base_url}/${this.bd}/ipress/${id}`)
    }

    editIpress(ipress) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress`, ipress)
    }

    //jurisdiccion
    createJurisdiccionIpress(idIpress, req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/agregarjurisdiccion/${idIpress}`, req)
    }

    deleteJurisdiccionIpress(idIpress, req) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/ipress/eliminarjurisdiccion/${idIpress}`, req)
    }

    //ambiente
    createAmbienteIpress(idIpress, req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/agregarambiente/${idIpress}`, req)
    }

    editAmbienteIpress(idIpress, req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/actualizarambiente/${idIpress}`, req)
    }

    deleteAmbienteIpress(idIpress, codAmbiente) {
        return this.http.delete<any>(`${this.base_url}/${this.bd}/ipress//eliminarambiente/${idIpress}/${codAmbiente}`)
    }

    //turno
    createTurnoIpress(idIpress, req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/agregarturno/${idIpress}`, req)
    }

    editTurnoIpress(idIpress, req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/actualizarturno/${idIpress}`, req)
    }

    deleteTurnoIpress(idIpress, abreviatura) {
        return this.http.delete<any>(`${this.base_url}/${this.bd}/ipress/eliminarturno/${idIpress}/${abreviatura}`)
    }

    //rol
    createRolIpress(idIpress, req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/agregarrol/${idIpress}`, req)
    }

    editRolIpress(idIpress, req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/actualizarrol/${idIpress}`, req)
    }

    deleteRolIpress(idIpress, codUPS) {
        return this.http.delete<any>(`${this.base_url}/${this.bd}/ipress/eliminarrol/${idIpress}/${codUPS}`)
    }

    //encargado
    createEncargadoIpress(req) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/cambiarencargado`, req)
    }

    //horarios
    updateHorariosIpress(idIpress, req){
        return this.http.put<any>(`${this.base_url}/${this.bd}/ipress/actualizarhorario/${idIpress}`, req)
    }

    //clasificaciones
    listarClasificaciones(){
        return this.http.get<any>(`${this.base_url}/${this.bd}/ipress/listarMantenimientoClasificaciones`)
    }

    //categorizaciones
    listarCategorizaciones(){
        return this.http.get<any>(`${this.base_url}/${this.bd}/ipress/listarTipoDocCategorizacion`)
    }
}
