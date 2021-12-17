import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginInterface} from "../model/login.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<LoginInterface>;
  public currentUser: Observable<LoginInterface>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginInterface>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  base_uri = "http://167.172.226.220:8080/miacc/login";


  public get currentUserValue(): LoginInterface {
    return this.currentUserSubject.value;
  }

  user_login(body) {
    return this.http.post<any>(`${this.base_uri}`, body, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      })
    })
        .pipe(map(user => {
          if (user && user.token) {
            localStorage.setItem('usuario', JSON.stringify(user.usuario));
            localStorage.setItem('token', user.token);
            this.currentUserSubject.next(user);
          }
          return user;
        }))
  }

  login_quemado(credenciales){
    return this.http.get<any>('assets/login.json')
        .toPromise()
        .then(data => {
          if (credenciales.usuario === 'geresa' && credenciales.password === 'geresa'){
            const token={
              usuario: credenciales.usuario,
              respuesta: data.login_exitoso.respuesta,
              estado: data.login_exitoso.estado,
              roles: 'GERESA'
            }
            this.currentUserSubject.next(token)
            localStorage.setItem('token', JSON.stringify(token))
            return data.login_exitoso
          }
          else if(credenciales.usuario !== 'geresa' || credenciales.password !== 'geresa'
              || credenciales.usuario !== 'red' || credenciales.password !== 'red'
              || credenciales.usuario !== 'microred' || credenciales.password !== 'microred'
              || credenciales.usuario !== 'ipress' || credenciales.password !== 'ipress'
              || credenciales.usuario !== 'local' || credenciales.password !== 'local'
              || credenciales.usuario !== 'provincial' || credenciales.password !== 'provincial'
              || credenciales.usuario !== 'regional' || credenciales.password !== 'regional'
          ){
            return data.login_fallido
          }
        })
  }

  user_logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
