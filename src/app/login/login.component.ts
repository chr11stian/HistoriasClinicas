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
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    Ingresar() {
        let credenciales = {
            usuario: this.usuario,
            password: this.password
        }

        this.loginService.login_quemado(credenciales)
            .then(login => {
                if (login.estado === 1) {
                    this.router.navigate(['dashboard']);
                    console.log('login *', login)
                    let token = localStorage.getItem('token');
                    console.log('token *', token)
                } else if (login.estado === 2) {
                    console.log('error al loguearte')
                    console.log('login', login)
                }
            })
    }
}
