import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {LoginService} from "../services/login.service";
import {escala, nombreRol} from "../../cred/citas/models/data";
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
    nombreRol: string[] = []
    listnombreRol: nombreRol[] = []
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
        let rol = this.formRol.value.rol === '' ? this.rol[0] : this.formRol.value.rol
        let escala = this.formRol.value.escala === '' ? this.escala[0] : this.formRol.value.escala
        let credenciales = {
            username: this.serviceLogin.listEscala[0].user,
            password: this.serviceLogin.listEscala[0].pass,
            rol: rol,
            escala: escala
        }
        console.log('rol', this.formRol.value.rol)
        console.log(credenciales)
        this.serviceLogin.ingresar(credenciales).subscribe(resp => {
            if (resp.error) {
                console.log("error")
            }
            if (resp.token) {
                this.serviceLogin.getRol().subscribe((r: any) => {
                    localStorage.setItem('roles', JSON.stringify({"rol": rol, "escala": escala}));
                    console.log(r)
                })

                this.router.navigate(['dashboard']);
            }
        })
        this.ref.close()
    }

    ngOnInit(): void {
        this.list = this.serviceLogin.listEscala
        console.log('list', this.list)
        this.formBuild()
        this.buildEscala()
    }

    buildEscala() {
        this.list.map((r: escala) => {
            this.escala.push(r.escala)
        })
        this.rol = this.list[0].rol
        this.nombreRol = this.list[0].nombreRol
        this.listnombreRol = this.list[0].list
    }

    searchEscala(s: string) {
        this.list.map((r: escala) => {
            if (s === r.escala) {
                this.rol = r.rol
                this.nombreRol = r.nombreRol
            }
        })
    }

    cambio(e) {
        console.log('', e)
        this.searchEscala(e.value)
    }

    formBuild() {
        this.formRol = this.formBuilder.group({
            escala: new FormControl("", []),
            rol: new FormControl("", []),
        })
    }
}
