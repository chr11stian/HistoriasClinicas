import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
// import { LoginService } from 'src/app/core/services/login/login.service';
import {Router} from '@angular/router';
import {LoginService} from '../services/login-service/login.service'
import {dato} from "../../cred/citas/models/data";

@Component({
    selector: "app-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.css"],
})
export class TopMenuComponent implements OnInit {
    data: dato
    hiddenMenu: boolean = false;
    style: number = 12;
    items: MenuItem[];
    @Output() hiddenMenu1 = new EventEmitter<boolean>();
    @Output() style1 = new EventEmitter<number>();
    NombreUsuario: string = '';

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private loginService: LoginService,
    ) {
    }

    hidden() {
        this.hiddenMenu = !this.hiddenMenu;
        this.data = <dato>JSON.parse(localStorage.getItem('documento'));
        let data: dato = {
            nroDocumento: this.data.nroDocumento,
            tipoDoc: this.data.tipoDoc,
            idConsulta: this.data.idConsulta,
            anio: this.data.anio,
            mes: this.data.mes,
            dia: this.data.dia,
            sexo: this.data.sexo,
            fechaNacimiento: this.data.fechaNacimiento,
            hidden: !this.hiddenMenu
        }

        localStorage.setItem('documento', JSON.stringify(data));
        if (this.hiddenMenu == false) {
            this.style = 9;
            this.style1.emit(this.style)
        } else {
            this.style = 12;
            this.style1.emit(this.style)
        }
        this.hiddenMenu1.emit(!this.hiddenMenu)
    }


    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem('usuario'));
        this.NombreUsuario = user.nombres
        this.items = [
            {
                label: 'Mi Perfil',
                icon: 'pi pi-fw pi-user',
                routerLink: 'inicio'

            },
            {
                separator: true
            },
            {
                label: 'Cerrar Sesion',
                command: () => this.confirm(event),
                icon: 'pi pi-fw pi-power-off',
            }
        ];
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target,
            message: '¿Desea cerrar la sesión actual?',
            acceptLabel: 'Si',
            icon: 'pi pi-power-off',
            accept: () => {
                this.cerrarSesion();
            },
            reject: () => {
                this.messageService.add({
                    severity: "error",
                    summary: "Cancelado",
                    detail: "Gracias por quedarte con nosotros"
                });
            }
        });
    }

    cerrarSesion() {
        this.loginService.user_logout();
        this.refresh();
    }

    refresh(): void {
        this.messageService.add({
            severity: "info",
            summary: "Confirmado",
            detail: "Sesion cerrada con exito"
        });
        //window.location.reload();

    }
}
