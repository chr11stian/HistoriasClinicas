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

    getDataEvaluationHeight(genero: string) {
        if (genero.toLowerCase() === 'femenino')
            return this.http.get<any>('assets/data/girlsH.json')
        else
            return this.http.get<any>('assets/data/boysH.json')
    }

    getDataEvaluationWeight(genero: string) {
        if (genero.toLowerCase() === 'femenino')
            return this.http.get<any>('assets/data/girlsW.json')
        else
            return this.http.get<any>('assets/data/boysW.json')
    }

    getDataEvaluationCircunference(genero: string) {
        if (genero.toLowerCase() === 'femenino')
            return this.http.get<any>('assets/data/girlsC.json')
        else
            return this.http.get<any>('assets/data/boysC.json')
    }

    getDataEvaluationWeightHeight(genero: string) {
        if (genero.toLowerCase() === 'femenino')
            return this.http.get<any>('assets/data/girlsWH.json')
        else
            return this.http.get<any>('assets/data/boysWH.json')
    }
}
