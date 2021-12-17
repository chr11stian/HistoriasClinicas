import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CondicionPacienteDiscapacidadService {
  base_url = environment.baseUrl;
  bd = environment.bd;
  constructor(private http: HttpClient) {}
  getCPDs() {
    return this.http.get(
      `${this.base_url}/${this.bd}/condicionpacientediscapacidad`
    );
  }
  getCPD(id: string) {
    return this.http.get(
      `${this.base_url}/${this.bd}/condicionpacientediscapacidad/${id}`
    );
  }
  deleteCPD(id: string) {
    return this.http.delete(
      `${this.base_url}/${this.bd}/condicionpacientediscapacidad/${id}`
    );
  }
  addCPD(CPD: any) {
    return this.http.post(
      `${this.base_url}/${this.bd}/condicionpacientediscapacidad`,
      CPD
    );
  }
  updateCPD(CPD: any) {
    return this.http.put(
      `${this.base_url}/${this.bd}/condicionpacientediscapacidad`,
      CPD
    );
  }
}
