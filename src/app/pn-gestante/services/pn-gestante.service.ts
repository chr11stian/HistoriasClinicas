import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { PNGestante } from "../interfaces/pn-gestante";
import { GestanteModel } from "../interfaces/GestanteModel";
import { NuevaGesta } from "../interfaces/NuevaGesta";
@Injectable({
    providedIn: "root",
})
export class PnGestanteService {
    couch: boolean = false;
    bd = environment.bd_pn_gestante;
    base_url = environment.base_url_Couch;
    base_url_view = environment.base_url_couch_pngestante_view;
    base_url_update = environment.base_url_couch_gestante_update;

    getauxNroDocPersonal(): string {
        return JSON.parse(localStorage.getItem("usuario")).nroDocumento === null
            ? ""
            : JSON.parse(localStorage.getItem("usuario")).nroDocumento;
    }

    getauxNombresPersonal(): string {
        return JSON.parse(localStorage.getItem("usuario")).nombres === null
            ? ""
            : JSON.parse(localStorage.getItem("usuario")).nombres;
    }

    getauxApellidosPersonal(): string {
        return JSON.parse(localStorage.getItem("usuario")).apellidos === null
            ? ""
            : JSON.parse(localStorage.getItem("usuario")).apellidos;
    }
    constructor(private http: HttpClient) {}

    getauxCodeessActual(): string {
        return JSON.parse(localStorage.getItem("usuario")).ipress.renipress ===
            null
            ? ""
            : JSON.parse(localStorage.getItem("usuario")).ipress.renipress;
    }

    getaux_eessActual(): string {
        return JSON.parse(localStorage.getItem("usuario")).ipress.nombreEESS ===
            null
            ? ""
            : JSON.parse(localStorage.getItem("usuario")).ipress.nombreEESS;
    }

    getToken() {
        return JSON.parse(localStorage.getItem("token")).tokenCouch === null
            ? ""
            : JSON.parse(localStorage.getItem("token")).tokenCouch;
    }

    getAnio(): string {
        let fecha_hoy = new Date();
        let anio = fecha_hoy.getFullYear();
        return anio.toString();
    }

    mostrarPadronGestantes(cod_ipress: string) {
        return this.http.post<any[]>(
            `${this.base_url_view}/pn-gestantes-ipress`,
            {
                keys: [`${cod_ipress}`],
            }
        );
    }

    addGestante(pn_gestante: GestanteModel) {
        return this.http.post(`${this.base_url}/${this.bd}`, pn_gestante);
    }

    updatedGestante(id: string, updatedPnGestante: any, revision: string) {
        return this.http.put(
            `${this.base_url}/${this.bd}/${id}`,
            updatedPnGestante,
            {
                params: {
                    rev: revision,
                },
            }
        );
    }

    getGestanteDni(dni: string) {
        //implementar una vista para traer gestante del padron gestantes_dni
        return this.http.post<any[]>(`${this.base_url_view}/gestantes-dni`, {
            keys: [`${dni}`],
        });
    }

    cambioEESS(
        id: string,
        nuevo_codEessActual: string,
        nuevo_eessActual: string
    ) {
        console.log(`${this.base_url_update}/cambiar_eess/id`);
        return this.http.put(`${this.base_url_update}/cambiar_eess/${id}`, {
            codEessActual: nuevo_codEessActual,
            eessActual: nuevo_eessActual,
        });
    }

    actualizarNumeroGesta(
        id: string,
        nuevo_nroGesta: NuevaGesta,
        nuevo_fur: string,
        nuevo_fpp: string
    ) {
        console.log(`${this.base_url_update}/actualizar_nroGesta/${id}`);
        return this.http.put(
            `${this.base_url_update}/actualizar_nroGesta/${id}`,
            {
                nroGesta: {
                    nroGesta: nuevo_nroGesta["nroGesta"],
                    fur: nuevo_nroGesta["fur"],
                    fpp: nuevo_nroGesta["fpp"],
                    codEessActual: nuevo_nroGesta["codEessActual"],
                    eessActual: nuevo_nroGesta["eessActual"],
                    morbilidadPotencial:nuevo_nroGesta["morbilidadPotencial"],
                    observaciones:nuevo_nroGesta["observaciones"],
                    aborto:nuevo_nroGesta["aborto"],
                    estado: ""

                },
                fur: nuevo_fur,
                fpp: nuevo_fpp,
            }
        );
    }

    actualizarInformacionGestante(id: string, cambio_gestante: GestanteModel) {
        console.log(`${this.base_url_update}/actualizar_dataGestante/${id}`);
        return this.http.put(
            `${this.base_url_update}/actualizar_dataGestante/${id}`,
            {
                nombres: cambio_gestante["nombres"],
                apellidos: cambio_gestante["apellidos"],
                fechaNacimiento: cambio_gestante["fechaNacimiento"],
                tipoDocIdentidad: cambio_gestante["tipoDocIdentidad"],
                nroDocIdentidad: cambio_gestante["nroDocIdentidad"],
                telefono: cambio_gestante["telefono"],
                tieneSis: cambio_gestante["tieneSis"],
                direccion: cambio_gestante["direccion"],
                referencia: cambio_gestante["referencia"],
                hcl2: cambio_gestante["hcl2"],
                codEessAnterior: cambio_gestante["codEessAnterior"],
                eessAnterior: cambio_gestante["eessAnterior"],
                codEessActual: cambio_gestante["codEessActual"],
                eessActual: cambio_gestante["eessActual"],
                fur: cambio_gestante["fur"],
                fpp: cambio_gestante["fpp"],
                morbilidadPotencial: cambio_gestante["morbilidadPotencial"],
                observaciones: cambio_gestante["observaciones"],
                dniPersonal: cambio_gestante["dniPersonal"],
                personalEess: cambio_gestante["personalEess"],
                fechaReg: cambio_gestante["fechaReg"],
                aborto: cambio_gestante["aborto"],
            }
        );
    }

    getGestanteDniIpress(codEessActual:string,dni: string) {
        //implementar una vista para traer gestante del padron gestantes_dni
        return this.http.post<any[]>(`${this.base_url_view}/gestante-dni-ipress`, {
            keys: [[`${codEessActual}`,`${dni}`]],
        });
    }
}
