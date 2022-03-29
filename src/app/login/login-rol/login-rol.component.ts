import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {LoginService} from "../services/login.service";
import {escala} from "../../cred/citas/models/data";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-rol',
    templateUrl: './login-rol.component.html',
    styleUrls: ['./login-rol.component.css']
})
export class LoginRolComponent implements OnInit {
    formRol: FormGroup
    escala: string [] = []
    rol: string[] = []
    list: escala[]
    destino = [
        {name: 'Emergencia', code: 'Emergencia'},
        {name: 'Consulta Externa', code: 'Consulta Externa'},
        {name: 'Apoyo al diagnóstico', code: 'Apoyo al diagnóstico'}
    ];

    constructor(private formBuilder: FormBuilder,
                private ref: DynamicDialogRef,
                private serviceLogin: LoginService,
                private router: Router) {
    }

    ingresar() {
        let credenciales = {
            username: this.serviceLogin.listEscala[0].user,
            password: this.serviceLogin.listEscala[0].pass,
            rol: this.formRol.value.rol === '' ? this.rol[0] : this.formRol.value.rol,
            escala: this.formRol.value.escala === '' ? this.escala[0] : this.formRol.value.escala

        }
        console.log(credenciales)
        this.serviceLogin.ingresar(credenciales).subscribe(resp => {
            if (resp.error) {
                console.log("error")
            }
            if (resp.token) {
                this.router.navigate(['dashboard']);
            }
        })
        this.ref.close()
    }

    ngOnInit(): void {
        this.list = this.serviceLogin.listEscala
        this.formBuild()
        this.buildEscala()
    }

    buildEscala() {
        this.list.map((r: escala) => {
            this.escala.push(r.escala)
        })
        this.rol = this.list[0].rol
    }

    searchEscala(s: string) {
        this.list.map((r: escala) => {
            if (s === r.escala)
                this.rol = r.rol
        })
    }

    cambio(e) {
        this.searchEscala(e.value)
    }

    formBuild() {
        this.formRol = this.formBuilder.group({
            escala: new FormControl("", []),
            rol: new FormControl("", []),
        })
    }
}
