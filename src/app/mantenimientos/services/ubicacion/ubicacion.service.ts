import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry, tap} from "rxjs/operators";
import {Departamentos, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
import {Personal} from "../../../core/models/personal.models";

@Injectable({
    providedIn: "root",
})
export class UbicacionService {
    // private _refresh = new Subject<void>();
    base_url = environment.baseUrl;
    bd = environment.bd;
    private ubicacions: Ubicacion[] = [];
    ubicacion: Ubicacion = null;

    public subjectUser = new BehaviorSubject<Ubicacion>(this.ubicacion);

    constructor(private http: HttpClient) {
    }

    // get refresh() {
    //     return this._refresh;
    // }

    // getUbicacion(): Observable<Ubicacion[]> {
    //     return this.http.get<Ubicacion[]>(`${this.base_url}/historiasclinicas/ubicacion/listar`);
    // }

    // get refresh() {
    //     return this._refresh;
    // }

    getUbicacion() {
        return this.http.get(`${this.base_url}/${this.bd}/api/ubicacion/listar?page=1`);
    }

    getDepartamentos() {
        return this.http.get(`${this.base_url}/${this.bd}/api/ubicacion/departamentos`);
    }

    getUbicacionUbigeo(ubigeo: string) {
        return this.http.get(`${this.base_url}/${this.bd}/api/ubicacion/ubigeo/${ubigeo}`);
    }

    getProvinciasId2(id: string) {
        return this.http.get(`${this.base_url}/${this.bd}/api/ubicacion/provincias/${id}`);
    }


    getProvinces(id: string) {
        return this.http.post(`${this.base_url}/${this.bd}` + '/api/ubicacion/provincias', {
            selector: {
                id: {
                    "$regex": id + "(?i)"
                }
            },
            fields: ["nombre", "id"]
        })
    }

    getDistritos(id: string) {
        return this.http.post(`${this.base_url}/${this.bd}` + '/api/ubicacion/distritos', {
            selector: {
                id: {
                    "$regex": id + "(?i)"
                }
            },
            fields: ["nombre", "id"]
        })
    }

    getCentrosPoblados(id: string) {
        return this.http.post(`${this.base_url}/${this.bd}` + '/api/ubicacion/ccpp', {
            selector: {
                id: {
                    "$regex": id + "(?i)"
                }
            },
            fields: ["nombre", "id"]
        })
    }

}
