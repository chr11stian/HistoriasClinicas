import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class PesoGestanteGraphService {

    constructor(private http: HttpClient) {
    }

    getDataSobrepesoGestanteGraph() {
        return this.http
            .get<any>('assets/data/graphSobrepesoGestante.json')
    }

    getDataPesoGestanteNormalGraph() {
        return this.http
            .get<any>('assets/data/graphPesoNormalGestante.json')
    }


    getDataBajoPesoGestanteGraph() {
        return this.http
            .get<any>('assets/data/graphBajoPesoGestante.json',{
                params:{

                }
            })
    }

    getDataObesidadGestanteGraph() {
        return this.http
            .get<any>('assets/data/graphObesaGestante.json')
    }

    getDataAlturaUterinaGraph(){
        return this.http
            .get<any>('assets/data/alturaUterina.json')
    }


}
