import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ApiConsulta, DataQuery} from '../models/consultaGeneral'
import {environment} from 'src/environments/environment'
import {map} from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class ConsultaGeneralService {
    urlServer = environment.baseUrl
    bd = environment.bd
    base_url = `${this.urlServer}/${this.bd}/cred/consulta/`

    constructor(private http: HttpClient) {
    }

    crearConsulta(create: DataQuery) {
        const url = `${this.base_url}/crear/`
        return this.http.post<ApiConsulta>(url,
            create
        )
    }
    traerConsulta(idConsulta: string) {
        const url = `${this.base_url}datosgenerales/${idConsulta}`
        return this.http.get<any>(url)
    }
    datosGenerales(data: any) {
        return this.http.post(`${this.urlServer}/${this.bd}/paciente/docId`, data)
    }
    updateGenerales(id,data) {
        return this.http.post(`${this.urlServer}/${this.bd}/cred/consulta/datosgenerales/${id}`, data)
    }
    getGenerales(id) {
        return this.http.get(`${this.urlServer}/${this.bd}/cred/consulta/datosgenerales/${id}`)
    }
}
