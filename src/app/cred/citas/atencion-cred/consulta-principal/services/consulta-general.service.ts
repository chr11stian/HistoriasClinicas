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

    // http://192.168.5.3:3012/api/hce/cred/consulta/crear/

    crearConsulta(create: DataQuery) {
        const url = `${this.base_url}/crear/`
        return this.http.post<ApiConsulta>(url,
            create
        )
    }

    traerConsulta(idConsulta: string) {
        const url = `${this.base_url}/datosgenerales/${idConsulta}`
        return this.http.get<any>(url)
    }

    // saveConsultaDatosGenerales(consulta: ConsultaInputType, idConsulta: string) {
    //
    // }
}
