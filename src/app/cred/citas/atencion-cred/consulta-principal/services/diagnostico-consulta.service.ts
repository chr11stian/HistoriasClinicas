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
        return this.http.get(`${this.urlServer}/${this.bd}/consulta/diagnostico/resumen/${id}`)
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
