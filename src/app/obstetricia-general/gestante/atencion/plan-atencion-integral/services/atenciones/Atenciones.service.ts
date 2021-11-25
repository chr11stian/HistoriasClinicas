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


    private _atenciones: any[];

    constructor(private http: HttpClient) {
    }

    getAtenciones() {
        return this.http.get(this.base_url + "/all")

    }

    get atenciones(): any[] {
        return [this._atenciones];
    }

    agregarAtencion(atencion: any) {
        this._atenciones.push(atencion);
    }


    getPacientes() {
        // return this.http.get(`${this.base_url}/data`);
    }

}
