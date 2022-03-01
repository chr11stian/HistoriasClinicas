import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ControlCrecimientoService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    getControlCrecimiento(dni) {
        const url = `${this.base_url}/hce/cred/control/${dni}`
        return this.http.get(url)
    }

    updateControlCrecimiento(idConsulta: string, data) {
        const url = `${this.base_url}/hce/cred/consulta/evaluacion/crecimiento/${idConsulta}`
        return this.http.post(url, data)
    }

    getConsulta(idConsulta) {
        const url = `${this.base_url}/hce/cred/consulta/${idConsulta}`
        return this.http.get(url)
    }

    crearInterconsulta(dni: string, data) {
        const url = `${this.base_url}/hce/cred/consulta/crear/interconsulta/${dni}`
        return this.http.post(url, data)
    }

    crearConsulta(dni: string, data) {
        const url = `${this.base_url}/hce/cred/consulta/crear/${dni}`
        return this.http.post(url, data)
    }

    getDatosGenerales(idConsulta) {
        const url = `${this.base_url}/hce/cred/consulta/datos/generales/${idConsulta}`
        return this.http.get(url)
    }
}
