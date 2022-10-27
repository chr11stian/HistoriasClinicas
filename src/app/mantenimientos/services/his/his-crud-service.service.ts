import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HisCrudServiceService {
  urlServer = environment.baseUrl
  bd = environment.bd

  constructor(
    private http: HttpClient
  ) { }

  postCreateNewHis(data) {
    return this.http.post(`${this.urlServer}/${this.bd}/cie10his/save`, data)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }

  getPaginateHIS(page: number) {
    return this.http.get(`${this.urlServer}/${this.bd}/cie10his?page=${page}`)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }

  putUpdateHis(idHIS: string, data) {
    return this.http.put(`${this.urlServer}/${this.bd}/cie10his/${idHIS}`, data)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }

  deleteHISbyid(idHIS: string) {
    return this.http.delete(`${this.urlServer}/${this.bd}/cie10his/${idHIS}`)
      .toPromise()
      .then(res => <any[]>res)
      .then(data => { return data; });
  }
}
