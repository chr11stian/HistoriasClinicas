import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginInterface} from "../model/login.interface";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    base_uri = environment.base_uri;

    private currentUserSubject: BehaviorSubject<LoginInterface>;
    public currentUser: Observable<LoginInterface>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<LoginInterface>(JSON.parse(localStorage.getItem('token')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

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
                console.log('user', user)
                if (user) {
                    const token = {
                        usuario: 'user',
                        roles: user.usuario.rol,
                        token: user.token
                    }
                    console.log("token", token)
                    this.currentUserSubject.next(token)

                    localStorage.setItem('user', JSON.stringify(token))
                    localStorage.setItem('usuario', JSON.stringify(user.usuario))
                    localStorage.setItem('token', JSON.stringify(token))
                }
                return user;
            }))
    }

    login_quemado(credenciales) {
        return this.http.get<any>('assets/login.json')
            .toPromise()
            .then(data => {
                console.log(credenciales)
                if (credenciales.usuario === 'geresa' && credenciales.password === 'geresa') {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: 'GERESA'
                    }
                    //this.currentUserSubject.next(token)
                    localStorage.setItem('token', JSON.stringify(token))
                    return data.login_exitoso
                }
                if (credenciales.usuario === 'red' && credenciales.password === 'red') {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: 'RED'
                    }
                    //this.currentUserSubject.next(token)
                    localStorage.setItem('token', JSON.stringify(token))
                    return data.login_exitoso
                }
                if (credenciales.usuario === 'microred' && credenciales.password === 'microred') {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: 'MICRORED'
                    }
                    //this.currentUserSubject.next(token)
                    localStorage.setItem('token', JSON.stringify(token))
                    return data.login_exitoso
                }
                if (credenciales.usuario === 'ipress' && credenciales.password === 'ipress') {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: 'IPRESS'
                    }
                    //this.currentUserSubject.next(token)
                    localStorage.setItem('token', JSON.stringify(token))
                    return data.login_exitoso
                } else if (credenciales.usuario !== 'geresa' || credenciales.password !== 'geresa'
                    || credenciales.usuario !== 'red' || credenciales.password !== 'red'
                    || credenciales.usuario !== 'microred' || credenciales.password !== 'microred'
                    || credenciales.usuario !== 'ipress' || credenciales.password !== 'ipress'
                ) {
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
