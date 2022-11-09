import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../../login/services/login.service";

@Injectable({
    providedIn: "root",
})
export class UserGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const rol = JSON.parse(localStorage.getItem("rol"));
        if (route.data.roles.indexOf(rol) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(["dashboard"]);
            return false;
        }
        // authorised so return true
        return true;
    }
}
