import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CuposTriajeService {
  base_url = environment.baseUrl;
  bd = environment.bd;

  constructor(private http: HttpClient) { }
}
