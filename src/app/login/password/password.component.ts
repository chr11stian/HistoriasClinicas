import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {escala, nombreRol} from "../../cred/citas/models/data";
import Swal from "sweetalert2";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.css'],
    providers: [MessageService]
})
export class PasswordComponent implements OnInit {
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
                private router: Router,
                public messageService: MessageService) {
    }

    ingresar() {
        if (this.formRol.value.escala !== this.formRol.value.rol) {
            this.messageService.add({severity: 'error', summary: 'Las contraseñas no coinciden'});
        } else {
            let dni = JSON.parse(localStorage.getItem('usuario')).nroDocumento;
            this.serviceLogin.updatePassword(dni, {
                oldPass: this.serviceLogin.listEscala[0].pass,
                newPass: this.formRol.value.escala
            }).subscribe((r: any) => {
                Swal.fire({
                    icon: "success",
                    title: "Cambio correcto de contraseña",
                    text: "",
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.router.navigate(['dashboard']);
                this.ref.close()
            })

        }
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
