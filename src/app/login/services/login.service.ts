import { userInterface, rootInterface } from "./../model/login.interface";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { LoginInterface } from "../model/login.interface";
import { environment } from "../../../environments/environment";
import { escala } from "../../cred/citas/models/data";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  base_new = environment.base_login;
  base_uri = environment.base_uri;
  base_uri_ = environment.base_uri_;
  baseUrl = environment.baseUrl;
  listEscala: escala[];
  roles: string[] = [];
  private currentUserSubject: BehaviorSubject<rootInterface | userInterface>;
  public currentUser: Observable<rootInterface | userInterface>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<
      rootInterface | userInterface
    >(JSON.parse(localStorage.getItem("token")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): rootInterface | userInterface {
    return this.currentUserSubject.value;
  }
  user_logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.clear();
    this.router.navigate(["/login"]);
    //console.log("entro");
  }
  getUser(body) {
    return this.http.post<any>(`${this.base_uri}/modo`, body, {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
    });
  }

  ingresar_login(body, text) {
    // return this.http
    //     .post<any>(`${this.base_new}/login/${text}`, body, {
    //         headers: new HttpHeaders({
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "application/json",
    //         }),
    //     })
    // .pipe(
    //     map((user: rootInterface | userInterface) => {
    //         if (user) {
    //             const token = {
    //                 token: user.token,
    //                 usuario: user.usuario,
    //                 tokenCouch: user.tokenCouch,
    //             };
    //             console.log("token", token);
    //             this.currentUserSubject.next(token);

    //             localStorage.setItem(
    //                 "usuario",
    //                 JSON.stringify(user.usuario)
    //             );
    //             localStorage.setItem("token", JSON.stringify(token));
    //         }
    //         return user;
    //     })
    //     );
    const url: string = "/assets/data/data.json";
    return this.http.get(url).pipe(
      map((user: rootInterface | userInterface) => {
        if (user) {
          const token = {
            token: user.token,
            usuario: user.usuario,
            tokenCouch: user.tokenCouch,
          };
          // console.log("token", token);
          this.currentUserSubject.next(token);

          localStorage.setItem("usuario", JSON.stringify(user.usuario));
          localStorage.setItem("token", JSON.stringify(token));
        }
        return user;
      })
    );
  }

  getRol() {
    http: return this.http.get(`${this.base_new}/permisos/hce/lista/rol`);
  }
  getRoot(data) {
    return this.http.post(`${this.base_new}/login/root`, data);
  }
  getRoles(dni) {
    return this.http.get(`${this.base_new}/accesos/user/hce/${dni}`);
  }
  createAdmin(data) {
    return this.http.post(`${this.base_new}/accesos/root/user`, data);
  }

  /* listServiceStaff(dni) {
        return this.http.get(
            `${this.baseUrl}/hce/personal/listarroles/DNI/${dni}`
        );
    }
    crearRol(data) {
        return this.http.post(`${this.base_uri_}/accesos/user`, data);
    }

    updatePassword(dni, data) {
        return this.http.put(`${this.base_uri_}/accesos/user/${dni}`, data);
    }
    
    resetPass(dni, data) {
        return this.http.put(
            `${this.base_new}/accesos/user/reset-pass/hce/${dni}`,
            data
        );
    } */
}

/* version anterior */
/*  user_login(body) {
        return this.http
            .post<any>(`${this.base_uri}`, body, {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                }),
            })
            .pipe(
                map((user) => {
                    console.log("user", user);
                    if (user) {
                        const token = {
                            usuario: "user",
                            roles: user.usuario.rol,
                            token: user.token,
                        };
                        console.log("token", token);
                        this.currentUserSubject.next(token);

                        localStorage.setItem("user", JSON.stringify(token));
                        localStorage.setItem(
                            "usuario",
                            JSON.stringify(user.usuario)
                        );
                        localStorage.setItem("token", JSON.stringify(token));
                    }
                    return user;
                })
            );
    }
*/
/* login_quemado(credenciales) {
        return this.http
            .get<any>("assets/login.json")
            .toPromise()
            .then((data) => {
                console.log(credenciales);
                if (
                    credenciales.usuario === "geresa" &&
                    credenciales.password === "geresa"
                ) {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: "GERESA",
                    };
                    //this.currentUserSubject.next(token)
                    localStorage.setItem("token", JSON.stringify(token));
                    return data.login_exitoso;
                }
                if (
                    credenciales.usuario === "red" &&
                    credenciales.password === "red"
                ) {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: "RED",
                    };
                    //this.currentUserSubject.next(token)
                    localStorage.setItem("token", JSON.stringify(token));
                    return data.login_exitoso;
                }
                if (
                    credenciales.usuario === "microred" &&
                    credenciales.password === "microred"
                ) {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: "MICRORED",
                    };
                    //this.currentUserSubject.next(token)
                    localStorage.setItem("token", JSON.stringify(token));
                    return data.login_exitoso;
                }
                if (
                    credenciales.usuario === "ipress" &&
                    credenciales.password === "ipress"
                ) {
                    const token = {
                        usuario: credenciales.usuario,
                        respuesta: data.login_exitoso.respuesta,
                        estado: data.login_exitoso.estado,
                        roles: "IPRESS",
                    };
                    //this.currentUserSubject.next(token)
                    localStorage.setItem("token", JSON.stringify(token));
                    return data.login_exitoso;
                } else if (
                    credenciales.usuario !== "geresa" ||
                    credenciales.password !== "geresa" ||
                    credenciales.usuario !== "red" ||
                    credenciales.password !== "red" ||
                    credenciales.usuario !== "microred" ||
                    credenciales.password !== "microred" ||
                    credenciales.usuario !== "ipress" ||
                    credenciales.password !== "ipress"
                ) {
                    return data.login_fallido;
                }
            });
    } */
/* ingresar(body) {
        return this.http
            .post<any>(`${this.base_uri}`, body, {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                }),
            })
            .pipe(
                map((user) => {
                    console.log("user", user);
                    if (user) {
                        const token = {
                            usuario: user.usuario.nroDocumento,
                            roles: user.usuario.escala,
                            token: user.token,
                        };
                        console.log("token", token);
                        this.currentUserSubject.next(token);

                        localStorage.setItem(
                            "usuario",
                            JSON.stringify(user.usuario)
                        );
                        localStorage.setItem("token", JSON.stringify(token));
                    }
                    return user;
                })
            );
    } */
