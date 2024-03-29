import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuaService {
  urlServer = environment.baseUrl;
  bd = environment.bd;
  urlReporter = environment.base_urlTx;
  evento: boolean = false;

  constructor(private http: HttpClient) { }

  getCrearRecuperarFUAxIdConsulta(idConsulta: string) {
    return this.http.get(`${this.urlServer}/${this.bd}/fua/crear/${idConsulta}`);
  }
  getFUAxIdFUA(idFUA: string) {
    return this.http.get(`${this.urlServer}/${this.bd}/fua/ipress-asegurado/${idFUA}`);
  }
  postCrearFUAxCodPrestacion(idConsulta: string, codPrestacion: string) {
    return this.http.get(`${this.urlServer}/${this.bd}/fua/crear-codprestacion/${idConsulta}/${codPrestacion}`);
  }
  postDatosIpressAsegurado(idFUA: string, dataFUA) {
    return this.http.post(`${this.urlServer}/${this.bd}/fua/guardar-ipressasegurado/${idFUA}`, dataFUA);
  }
  getSegundaParteFUA(idConsulta: string, idFUA: string, codPrestacion: string) {
    return this.http.get(`${this.urlServer}/${this.bd}/fua/datos2/${idConsulta}/${idFUA}/${codPrestacion}`);
  }
  postSegundaParteFUA(idFUA: string, codPrestacion: string, dataFUA) {
    return this.http.post(`${this.urlServer}/${this.bd}/fua/guardar/datos/${idFUA}/${codPrestacion}`, dataFUA);
  }
  getListaTratamientos(idConsulta: string) {
    return this.http.get(`${this.urlServer}/${this.bd}/fua/buscar-tratamientos/${idConsulta}`);
  }
  postTratamientosFUA(idFUA: string, data) {
    return this.http.post(`${this.urlServer}/${this.bd}/fua/crear/${idFUA}`, data);
  }
  getListaProcedimientosDiag(idConsulta: string, codPrestacion: string) {
    return this.http.get(`${this.urlServer}/${this.bd}/fua/buscar-proced-img-labo/${idConsulta}/${codPrestacion}`);
  }
  postProcedimientos
  /**REPORTES */
  getReportFUA(idFUA: string) {
    return this.http.get(`${this.urlReporter}/jasperserver/rest_v2/reports/Reports/FUA/anexo1.pdf?idFua=${idFUA}`);
  }
  /**PROMISES */
  getPromiseCrearRecuperarFUAxIdConsulta(idConsulta: string) {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/fua/crear/${idConsulta}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getPromiseIpressAseguradoxidFUA(idFUA: string) {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/fua/ipress-asegurado/${idFUA}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
  getPromiseSegundaParteFUA(idConsulta: string, idFUA: string, codPrestacion: string) {
    return this.http.get<any>(`${this.urlServer}/${this.bd}/fua/datos2/${idConsulta}/${idFUA}/${codPrestacion}`)
      .toPromise()
      .then(res => <any>res.object)
      .then(data => { return data; })
      .catch(error => { return error.error });
  }
}
