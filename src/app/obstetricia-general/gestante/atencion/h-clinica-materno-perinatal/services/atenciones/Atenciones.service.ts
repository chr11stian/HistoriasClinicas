import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class AtencionesService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    // base_url2 = environment.baseUrl2;
    // bd2 = environment.bd2;//pacientes
    constructor(private http: HttpClient) {
    }
    getAtencionService(id ) {
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/atencionprenatal/listar/${id}`);
    }
    getDatosGrafico(id){
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/atencionprenatal/graficoPesoMadreid/${id}`);
    }
    //obstetricia/atencionprenatal/graficoAlturaUterinaId/61ae63a9b7b1da403c60f598
    getDatosGraficoAlturaUterina(id){
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/atencionprenatal/graficoAlturaUterinaId/${id}`);
    }
}
