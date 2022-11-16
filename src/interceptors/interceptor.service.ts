import { Component, Injectable } from "@angular/core";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { catchError, finalize } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { LoginService } from "src/app/login/services/login.service";
import { FuaService } from "src/app/fua/services/fua.service";
import Swal from "sweetalert2";
import { SpinnerHandlerService } from "src/app/core/services/spinner-handler.service";
import { VisitaDomiciliariaService } from "src/app/visita-domiciliaria/services/visita-domiciliaria.service";
import { PnGestanteService } from '../app/pn-gestante/services/pn-gestante.service';

@Injectable({
    providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
    private countRequest: number = 0;
    loading$ = this.spinnerHandler.showSpinner$;

    constructor(
        private servioVisitaDomiciliaria: VisitaDomiciliariaService,
        private servicioPadronGestantes:PnGestanteService,
        private loginService: LoginService,
        private fuaService: FuaService,
        private spinnerHandler: SpinnerHandlerService // private messageService: MessageService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let cloned = req;
        let urlReq = cloned.url.split(":");
        if (urlReq[0] == "http") {
            urlReq = urlReq[2].split("/");
        }
        let portNum = urlReq[0];
        // console.log("numero de puerto",portNum);
        // urlReq = urlReq[0];
        const idToken = JSON.parse(localStorage.getItem("token"));

        if (idToken) {
            let username: "reporte";
            let password: "reporte@2022";
            const headers = new HttpHeaders();
            // console.log('entro token', idToken)
            let jwtAuth: string = "Bearer " + idToken.token;
            let basicAuth: string =
                "Basic " + btoa("reporte" + ":" + "reporte@2022");
            let basicAuthCouch: string =
                "Basic " + btoa("admin" + ":" + "GRDS2021");
            if (this.servioVisitaDomiciliaria.couch) {
                cloned = req.clone({
                    setHeaders: {
                        Authorization:
                            `Bearer ` +
                            this.servioVisitaDomiciliaria.getToken(),
                    },
                });
                this.servioVisitaDomiciliaria.couch = false;
            }else if(this.servicioPadronGestantes.couch){
                cloned = req.clone({
                    setHeaders: {
                        Authorization:
                            `Bearer ` +
                            this.servicioPadronGestantes.getToken(),
                    },
                });
                this.servicioPadronGestantes.couch = false;
                // console.log("couch", this.servicioPadronGestantes.couch);
            }
            else {
                cloned = req.clone({
                    setHeaders: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: portNum == "8200" ? basicAuth : jwtAuth,
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Headers":
                            "origin, content-type, accept, authorization",
                        "Access-Control-Allow-Methods":
                            "GET, POST, PUT, DELETE, OPTIONS, HEAD",
                    },
                });
            }
            this.spinnerHandler.show();
            this.countRequest++;
        }
        return next
            .handle(cloned)
            .pipe(
                catchError((response) => {
                    console.log("Response de interceptor ", response);

                    if (response instanceof HttpErrorResponse) {
                        if ([400, 401, 403].indexOf(response.status) !== -1) {
                            // this.loginService.user_logout()
                            // window.location.reload();
                            // return throwError(' Su sesion ha expirado')
                        } else if (response.status === 0) {
                            return throwError("Error del CORS interceptor");
                        }
                        console.log("err.status", response.status);
                    }
                    return throwError(response);
                })
            )
            .pipe(
                finalize(() => {
                    // console.log('data res de interceptor ', cloned);
                    this.countRequest--;
                    if (this.countRequest == 0) {
                        this.spinnerHandler.hide();
                    }
                })
            );
    }
}
