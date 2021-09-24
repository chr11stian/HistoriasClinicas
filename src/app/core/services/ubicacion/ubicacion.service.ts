import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {tap, map } from "rxjs/operators";
import {Ubicacion} from "../../models/ubicacion.models";
import { ObjectRes } from '../../models/objectRes';

@Injectable({
    providedIn: 'root'
})
export class UbicacionService {

    // private _refresh = new Subject<void>();
    base_url = environment.baseUrl;
    bd = environment.bd;
    private ubicacions: Ubicacion[] = [];
    private objectsRes: ObjectRes[]=[]
    ubicacion: Ubicacion = null;
    objectRes: ObjectRes = null;

    public subjectUser = new BehaviorSubject<ObjectRes>(this.objectRes);

    constructor(private http: HttpClient) {
    }


    // get refresh() {
    //     return this._refresh;
    // }

    getUbicacion() {
        return this.http.get<ObjectRes>(`${this.base_url}/historiasclinicas/ubicacion/listar`)
            .pipe(
                // tap((ubicacions) => this.ubicacions = ubicacions)
                // map((response:Response)=> response.json());
            )
    }
}
