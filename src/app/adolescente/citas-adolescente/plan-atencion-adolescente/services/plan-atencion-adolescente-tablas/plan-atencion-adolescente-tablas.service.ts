import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {tap} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlanAtencionAdolescenteTablasService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) {
  }
  getTodasLasEvaluaciones(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/atencion/integral/${nroDoc}`);
  }
  getEvaluacionCrecimientoFisicoEstadoNutricional(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/evaluacion/fisica/${nroDoc}`);
  }
  agregarEvaluacionCrecimientoFisicoEstadoNutricional(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/evaluacion/fisico/${nroDoc}`, body)
  }
  editarEvaluacionCrecimientoFisicoEstadoNutricional(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/evaluacion/fisica/${nroDoc}`, body)
  }
  getEvaluacionAgudezaVisualAuditiva(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/evaluacion/visualAuditiva/${nroDoc}`);
  }
  agregarEvaluacionAgudezaVisualAuditiva(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/evaluacion/visualAuditiva/${nroDoc}`, body)
  }
  editarEvaluacionAgudezaVisualAuditiva(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/evaluacion/visual/auditiva/${nroDoc}`, body)
  }
  getEvaluacionFisicaPostural(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/evaluacion/fisico/postural/${nroDoc}`);
  }
  agregarEvaluacionFisicaPostural(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/evaluacion/fisica/postural/${nroDoc}`, body)
  }
  editarEvaluacionFisicaPostural(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/evaluacion/fisico/postural/${nroDoc}`, body)
  }
  getEvaluacionDesarrolloSexual(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/desarrollo/sexual/${nroDoc}`);
  }
  agregarEvaluacionDesarrolloSexual(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/desarrollo/sexual/${nroDoc}`, body)
  }
  editarEvaluacionDesarrolloSexual(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/desarrollo/sexual/${nroDoc}`, body)
  }
  getEvaluacionHabilidadesSociales(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/habilidades/sociales/${nroDoc}`);
  }
  agregarEvaluacionHabilidadesSociales(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/habilidades/sociales/${nroDoc}`, body)
  }
  editarEvaluacionHabilidadesSociales(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/habilidades/sociales/${nroDoc}`, body)
  }
  getIdentificacionFactoresRiesgo(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/factores/riesgo/${nroDoc}`);
  }
  agregarIdentificacionFactoresRiesgo(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/factores/riesgo/${nroDoc}`, body)
  }
  editarIdentificacionFactoresRiesgo(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/factores/riesgo/${nroDoc}`, body)
  }
  getIdentificacionColeraIrritabilidadAgresion(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/identificacion/colera/${nroDoc}`);
  }
  agregarIdentificacionColeraIrritabilidadAgresion(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/identificacion/colera/${nroDoc}`, body)
  }
  editarIdentificacionColeraIrritabilidadAgresion(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/identificacion/colera/${nroDoc}`, body)
  }
  getTamizajeViolencia(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/tamizaje/violencia/${nroDoc}`);
  }
  agregarTamizajeViolencia(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/tamizaje/violencia/${nroDoc}`, body)
  }
  editarTamizajeViolencia(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/tamizaje/violencia/${nroDoc}`, body)
  }
  getDescarteEnfermedadesNoTransmisibles(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/enfermedades/noTransmisibles/${nroDoc}`);
  }
  agregarDescarteEnfermedadesNoTransmisibles(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/descarte/enfermedades/${nroDoc}`, body)
  }
  editarDescarteEnfermedadesNoTransmisibles(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/descarte/enfermedades/${nroDoc}`, body)
  }
  getEscolaridad(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/escolaridad/${nroDoc}`);
  }
  agregarEscolaridad(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/escolaridad/${nroDoc}`, body)
  }
  editarEscolaridad(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/escolaridad/${nroDoc}`, body)
  }
  getHabitos(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/listar/habitos/${nroDoc}`);
  }
  agregarHabitos(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/habitos/${nroDoc}`, body)
  }
  editarHabitos(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/habitos/${nroDoc}`, body)
  }
  getSaludSexualReproductiva(nroDoc) {
    return this.http.get(`${this.base_url}/${this.bd}/cuidadoPreventivo/lista/salud/sexual/reproductiva/${nroDoc}`);
  }
  agregarSaludSexualReproductiva(nroDoc,body){
    return this.http.post(`${this.base_url}/${this.bd}/cuidadoPreventivo/agregar/salud/sexual/reproductiva/${nroDoc}`, body)
  }
  editarSaludSexualReproductiva(nroDoc,body){
    return this.http.put(`${this.base_url}/${this.bd}/cuidadoPreventivo/editar/salud/sexual/${nroDoc}`, body)
  }
}
