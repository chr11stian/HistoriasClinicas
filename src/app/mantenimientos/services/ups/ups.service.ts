import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UpsService {

    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) { }

    getUPS() {
        return this.http.get(`${this.base_url}/${this.bd}/api/ups/listar`);
    }

    getUPSByCodUPS() {
        return this.http.get(`${this.base_url}/${this.bd}/api/ups/codUps`);
    }

    postUPS(dataUPS) {
        return this.http.post(`${this.base_url}/${this.bd}/api/ups/save`, dataUPS);
    }

    putUPS(idUPS, dataUPS) {
        return this.http.post(`${this.base_url}/${this.bd}/api/ups/update/${idUPS}`, dataUPS);
    }

    deleteUPS(idUPS) {
        return this.http.delete(`${this.base_url}/${this.bd}/api/ups/delete/${idUPS}`);
    }

    postAddSubTitulo(idUPS, dataUPS) {
        return this.http.post(`${this.base_url}/${this.bd}/api/ups/add_subtitulo/${idUPS}`, dataUPS);
    }

    deleteSubTituloUPS(idUPS, nombreSubTipo) {
        return this.http.post(`${this.base_url}/${this.bd}/api/ups/delete_subtitulo/${idUPS}`, nombreSubTipo);
    }

    updateSubtitulosUPS(idUPS, dataUPS) {
        return this.http.post(`${this.base_url}/${this.bd}/api/ups/update_subtitulo/${idUPS}`, dataUPS);
    }
}
