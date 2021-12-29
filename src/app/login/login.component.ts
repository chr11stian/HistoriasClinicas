import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PrimeNGConfig} from "primeng/api";
import {LoginService} from './services/login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuario = '';
    password = '';

    constructor(
        private primengConfig: PrimeNGConfig,
        private loginService: LoginService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    Ingresar() {
        let credenciales = {
            username: this.usuario,
            password: this.password
        }
        this.loginService.user_login(credenciales).subscribe(resp => {
            console.log(resp)
            if (resp.error) {
                console.log("error")
            }
            if (resp.token) {
                console.log('entro')
                this.router.navigate(['dashboard']);
            }


        })
    }
}
