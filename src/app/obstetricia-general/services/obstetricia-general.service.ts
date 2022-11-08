import { Injectable, EventEmitter } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ObstetriciaGeneralService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    /**Id, tipoDoc,nroDoc,nroEmbarazo de la Historia clinica materno perinatal: para actualizar el documento**/
    idGestacion: string = "";
    tipoDoc: string = "";
    nroDoc: string = "";
    nroEmbarazo: string = "";
    nroHcl: string;
    estadoEmbarazo: string = "";
    data: any;
    public consultationStatus$ = new BehaviorSubject<number>(0)

    /***Id del consultorio obstetrico***/
    idConsultoriObstetrico: string = "";

    constructor(private http: HttpClient) {
    }

    get actualConsultationStatus$(): Observable<number> {
        return this.consultationStatus$.asObservable();
    }

    setActualConsultationStatus$(consultStatus: number): void {
        this.consultationStatus$.next(consultStatus);
    }

    getPacienteFiliacion(tipoDoc, nroDoc) {
        return this.http.get(`${this.base_url}/${this.bd}/filiacion/listarfiliacion/${tipoDoc}/${nroDoc}`)
    }

    getConsultorioObstetrico(idConsulta: string, data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/consulta/buscar/${idConsulta}`, data)
            .toPromise()
            .then(res => res)
            .then(data => { return data; })
            .catch(error => { return error.error })
    }
}
