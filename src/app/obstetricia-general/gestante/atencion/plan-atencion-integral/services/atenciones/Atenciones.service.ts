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
    getAtencionService(nroHcl,nroEmbarazo ) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/buscarpuerperio/${nroHcl}/${nroEmbarazo}`);
    }


}
