import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CategoriaEstablecimientoService {
    private _refresh = new Subject<void>();
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    get refresh() {
        return this._refresh;
    }

    getCategoriaEstablecimiento() {
        return this.http.get(`${this.base_url}/${this.bd}/api/categoriaestablecimiento`);
    }

    createCategoriaEstablecimiento(categoria) {
        return this.http.post<any>(`${this.base_url}/${this.bd}/api/categoriaestablecimiento`, categoria)
    }

    deleteCategoriaEstablecimiento(id) {
        return this.http.delete(`${this.base_url}/${this.bd}/api/categoriaestablecimiento/${id}`)
    }

    editCategoriaEstablecimiento(categoria) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/categoriaestablecimiento`, categoria)
    }
}
