import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginInterface} from "../../models/login";
import {map} from 'rxjs/operators';
import {Router, RouterModule, PreloadAllModules, RouterLink} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<LoginInterface>;
  public currentUser: Observable<LoginInterface>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginInterface>(JSON.parse(localStorage.getItem('usuario')));
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

  user_logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
