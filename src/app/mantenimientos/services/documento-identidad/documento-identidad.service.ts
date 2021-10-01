import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DocumentoIdentidadService {

    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) { }

    getDocumentosIdentidad() {
        return this.http.get(`${this.base_url}/${this.bd}/api/documentoidentidad`);
    }

    postDocumentoIdentidad(data) {
        return this.http.post(`${this.base_url}/${this.bd}/api/documentoidentidad`, data)
    }

    putDocumentoIdentidad(data) {
        return this.http.put<any>(`${this.base_url}/${this.bd}/api/documentoidentidad/`, data)
    }
}
