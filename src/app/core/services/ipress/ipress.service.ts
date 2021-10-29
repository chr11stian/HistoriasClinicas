import { HttpClient } from '@angular/common/http';
import { Observable, pipe, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class IpressService {

  base_url = environment.baseUrl;
    bd = environment.bd;
    private _refresh = new Subject<void>();


    constructor(private http: HttpClient) {
    }

    getIpress(){
        return this.http.get<any[]>(`${this.base_url}/${this.bd}/api/ipress`);
    }
    getIpressID(id){
        return this.http.get<any[]>(`${this.base_url}/${this.bd}/api/ipress/${id}`);
    }
    createIpress(ipress) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/api/ipress`, ipress)
    }
    deleteIpress(id) {
        return this.http.delete(`${this.base_url}/${this.bd}/api/ipress/${id}`)
    }
    editIpress(ipress) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/ipress`, ipress)
    }
    createJurisdiccionIpress(idIpress,req){
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/ipress/agregarjurisdiccion/${idIpress}`,req)
    }
    deleteJurisdiccionIpress(idIpress,req){
        return this.http.post<any>(`${this.base_url}/${this.bd}/api/ipress/eliminarjurisdiccion/${idIpress}`,req)
    }
    createAmbienteIpress(idIpress,req){
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/ipress/agregarambiente/${idIpress}`,req)
    }
    editAmbienteIpress(idIpress,req){
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/ipress/actualizarambiente/${idIpress}`,req)
    }
    deleteAmbienteIpress(idIpress,codAmbiente){
        return this.http.delete<any>(`${this.base_url}/${this.bd}/api/ipress//eliminarambiente/${idIpress}/${codAmbiente}`)
    }
    createTurnoIpress(idIpress,req){
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/ipress/agregarturno/${idIpress}`,req)
    }
    editTurnoIpress(idIpress,req){
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/ipress/actualizarturno/${idIpress}`,req)
    }
    deleteTurnoIpress(idIpress,abreviatura){
        return this.http.delete<any>(`${this.base_url}/${this.bd}/api/ipress/eliminarturno/${idIpress}/${abreviatura}`)
    }
}
