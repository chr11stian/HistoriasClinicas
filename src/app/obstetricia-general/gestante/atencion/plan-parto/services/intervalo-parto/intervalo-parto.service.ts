import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IntervaloPartoService {
    base_url = environment.baseUrl;
    bd = environment.bd;

    constructor(private http: HttpClient) {
    }

    getIntervalosPartoById(id) {
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/planparto/listar/items/${id}`)
    }

    postIntervalosParto(id, data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/planparto/guardar/agregarPlanItem/${id}`, data)
    }

    editarIntervalosParto(id, data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/planparto/modificar/PlanItem/${id}`, data)
            .toPromise()
            .then(result => {
                return result;
                console.log('Actualizo Exitosa', result)
            })
            .catch(error => {
                console.log('Error al crear un registro', error)
            })
    }
    /* nuevos servicios para plan de parto */
    getPlanbyIdFiliacion(idFiliacion) {
        return this.http.get(`${this.base_url}/${this.bd}/obstetricia/planparto/buscar/${idFiliacion}`)
    }
    postPlanPartoByIdFiliacion(idFiliacion, data) {
        return this.http.post(`${this.base_url}/${this.bd}/obstetricia/planparto/save/${idFiliacion}`, data)
    }

}
