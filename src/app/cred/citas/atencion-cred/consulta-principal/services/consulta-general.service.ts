import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {ConsultaAPI, ConsultaInputType, CreateConsultaInterface} from '../models/consultaGeneral'
import {environment} from 'src/environments/environment'


@Injectable({
    providedIn: 'root'
})
export class ConsultaGeneralService {
    urlServer = environment.baseUrl
    bd = environment.bd
    base_url = `${this.urlServer}/${this.bd}/cred/consulta/`

    constructor(private http: HttpClient) {
    }

    // http://192.168.5.3:3012/api/hce/cred/consulta/crear/

    crearConsulta(create: CreateConsultaInterface) {
        const url = `${this.base_url}/crear/`
        return this.http.post<ConsultaAPI>(url,
            create
        )
    }

    saveConsultaDatosGenerales(consulta: ConsultaInputType, idConsulta: string) {

    }
}
