import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SuplementacionesMicronutrientesService {

  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) { }
  getListaMicronutrientesPro(dni:string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/suplementacion/${dni}`)
        .toPromise()
        .then(data => { return data })
        .catch(error => { return error })
  }
  getListaVitaminaAPro(dni:string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}cred/suplementacion/vitamina_a/${dni}`)
        .toPromise()
        .then(data => { return data })
        .catch(error => { return error })
  }
  // susbribibles
  getListaMicronutrientes(dni: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/suplementacion/${dni}`);
  }
  getVitaminaA(dni: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/suplementacion/vitamina_a/${dni}`);
  }

  PostSuplementacion(idConsulta: string, inputRequest) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/suplementacion/${idConsulta}`,inputRequest);
  }
  PostVitaminaA(idConsulta: string, inputRequest) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/suplementacion/vitamina_a/${idConsulta}`,inputRequest);
  }
  //dosaje de hemoglobina
  getDosajeHemoglobina(dni: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/dosaje_hemoglobina/${dni}`);
  }
  getDosajeHemoglobinaTerapeutico(dni: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/cred/dosaje_hemoglobina???/${dni}`);
  }
  PostDosajeHemoglobina(idConsulta: string, inputRequest) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/cred/consulta/evaluacion/dosajehb/${idConsulta}`,inputRequest);
  }
  // guardar dosaje
  PostDosajeHemoglobinaLaboratorio(idConsulta: string, inputRequest) {
    return this.http.post<any>(`${this.base_url}/${this.bd}/examenesAuxiliares/crear-Laboratorios-resultados/${idConsulta}`,inputRequest);
  }
  // obtenemos el factor de correccion segun al ipress
  getFactorCorrepcionXipress(idIpress: string) {
    return this.http.get<any>(`${this.base_url}/${this.bd}/ajusteHemoglobina/buscar/${idIpress}`);
  }
}
