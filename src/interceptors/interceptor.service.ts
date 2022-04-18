import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { LoginService } from "src/app/login/services/login.service";
import { FuaService } from "src/app/fua/services/fua.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private fuaService: FuaService
  ) // private messageService: MessageService
  { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let cloned = req;
    let urlReq = cloned.url.split(":");
    if (urlReq[0] == 'http') {
      urlReq = urlReq[2].split("/");
    }
    let portNum = urlReq[0];
    // urlReq = urlReq[0];
    const idToken = JSON.parse(localStorage.getItem("token"));
    if (idToken) {
      let username:'reporte';
      let password:'reporte@2022';
      const headers=new HttpHeaders();
      // console.log('entro token', idToken)
      let jwtAuth: string = "Bearer " + idToken.token;
      let basicAuth: string = "Basic " + btoa('reporte' + ":" + 'reporte@2022');
      cloned = req.clone({
        setHeaders: {
          "Access-Control-Allow-Origin": "*",
          Authorization: portNum == "8200" ? basicAuth : jwtAuth,
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "origin, content-type, accept, authorization",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD"
        },
      });
      // cloned = req.clone({
      //     headers: req.headers.set("Authorization", "Bearer " + idToken)
      // });
    }
    console.log("cloned ", cloned);
    return next.handle(cloned).pipe(
      catchError((response) => {
        console.log("response", response);
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
    );
  }
}
