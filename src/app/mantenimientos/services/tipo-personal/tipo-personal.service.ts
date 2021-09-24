import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {TipoPersonal} from "../../../core/models/mantenimiento.models";

@Injectable({
    providedIn: 'root'
})
export class TipoPersonalService {
    private _refresh = new Subject<void>();

    base_url = environment.baseUrl;
    private tipo_personales: TipoPersonal[] = [];

    constructor(private http: HttpClient) {
    }

    get refresh() {
        return this._refresh;
    }

    getTipo_Personal() {
        return this.http.get<TipoPersonal[]>(`${this.base_url}/historiasclinicas/api/tipopersonal`)
            .pipe(
                tap((tipo_personales) => this.tipo_personales = tipo_personales)
            )
    }
}
