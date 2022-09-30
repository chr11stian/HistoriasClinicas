import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ReportesHisServicesService {
    urlServer = environment.baseUrl;
    url = "http://192.168.5.3:8200";
    bd = environment.bd;
    constructor(private http: HttpClient) {}

    getListHisForUpsAuxFecha(fecha, upsAux: string) {
        const params = new HttpParams({
            fromObject: {
                upsAux: upsAux,
            },
        });
        return this.http.post(
            `${this.urlServer}/${this.bd}/his/listar/his/por/ups`,
            fecha,
            { params }
        );
    }

    reportHIS(fecha, ups, token) {
        return this.http.get(
            `${this.url}/jasperserver/rest_v2/reports/Reports/HIS/anexo1.pdf?fecha=${fecha}&upsAux=${ups}&token=Bearer ${token}`
        );
    }
}
