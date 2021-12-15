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
            .get<any>('assets/data/sobrepesoGestanteGraph.json')
    }

    getDataPesoGestanteNormalGraph() {
        return this.http
            .get<any>('assets/data/pesoNormalGestanteGraph.json')
    }


    getDataBajoPesoGestanteGraph() {
        return this.http
            .get<any>('assets/data/bajoPesoGestanteGraph.json',{
                params:{

                }
            })
    }

    getDataObesidadGestanteGraph() {
        return this.http
            .get<any>('assets/data/obesaGestanteGraph.json')
    }

    getDataAlturaUterinaGraph(){
        return this.http
            .get<any>('assets/data/alturaUterina.json')
    }


}
