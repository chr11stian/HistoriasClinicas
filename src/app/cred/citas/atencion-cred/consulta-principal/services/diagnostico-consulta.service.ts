import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ApiConsulta, DataQuery} from '../models/consultaGeneral'
import {environment} from 'src/environments/environment'
import {map} from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class DiagnosticoConsultaService {
    urlServer = environment.baseUrl
    bd = environment.bd
    base_url = `${this.urlServer}/${this.bd}/cred/consulta/`

    constructor(private http: HttpClient) {
    }
    getResultadosResumen(id){
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/resumen/${id}`)
    }
    getLaboratorioResumen(id){
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/resumen/laboratorio/${id}`)
    }
    getInmunizacionesResumen(id){
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/resumen/inmunizacion/${id}`)
    }
    getTamizajesResumen(id){
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/resumen/tamizaje/${id}`)
    }
    getEvaluacionesResumen(id){
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/resumen/test/${id}`)
    }
    addDiagnostico(id,data) {
        return this.http.put(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/${id}`, data)
    }
    updateDiagnostico(id,data) {
        return this.http.post(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/${id}`, data)
    }
    getDiagnostico(id) {
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/diagnostico/${id}`)
    }
}
