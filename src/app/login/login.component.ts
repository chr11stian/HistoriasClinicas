import { rootInterface, userInterface } from "./model/login.interface";
import { Component, OnInit, DoCheck } from "@angular/core";
import { Router } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { LoginService } from "./services/login.service";
import { LoginRolComponent } from "./login-rol/login-rol.component";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { rolInterface, escala, nombreRol } from "../cred/citas/models/data";
import {MessageService} from 'primeng/api';


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [DialogService, MessageService],
})
export class LoginComponent implements OnInit, DoCheck {
    ref: DynamicDialogRef;
    usuario = "";
    password = "";
    size: boolean;
    listRol: rolInterface[] = [];
    listAux: escala[] = [];
    roles: string[] = [];
    mensaje: string = "";

    constructor(
        private messageService: MessageService,
        private primengConfig: PrimeNGConfig,
        private loginService: LoginService,
        private router: Router,
        private dialog: DialogService,
        private breakpointObserver: BreakpointObserver
    ) {}

    ngDoCheck() {}

    ngOnInit(): void {
        this.size_width();
    }

    size_width() {
        this.breakpointObserver
            .observe(["(max-width: 500px)"])
            .subscribe((result: BreakpointState) => {
                this.size = result.matches;
            });
    }

    userLogin() {
        let credenciales = {
            username: this.usuario,
            password: this.password,
        };
        //console.log("credenciales", credenciales);
        /* this.loginService.getUser(credenciales).subscribe((r: any) => {
            this.listRol = r.modo;
            console.log("listRoles", this.listRol);
            this.buildRol();
        }); */
        /*  nuevo login */
        
        this.loginService.ingresar_login(credenciales, "hce").subscribe(
            (user: userInterface) => {
                console.log("user", user);
                if (user) {
                    this.loginService.roles = user.usuario.roles;
                    this.messageService.add({key: 'bc', severity:'success', summary: '', detail: 'Usuario Correcto!'});                                  
                    this.openRol(user.usuario.nombres+ " "+ user.usuario.apellidos);
                }
            },
            (error) => {
                if (error.status == 500 || error.status == 401) {
                    this.loginService
                        .ingresar_login(credenciales, "root")
                        .subscribe(
                            (user: rootInterface) => {
                                localStorage.setItem(
                                    "rol",
                                    JSON.stringify("ROLE_ADMININ_PERSONAL")
                                );
                                this.router
                                    .navigate(["/dashboard"])
                                    .then(() => {
                                        window.location.reload();
                                    });
                                this.ref.close();
                            },
                            (erro) => {
                                if (
                                    error.status == 500 ||
                                    error.status == 401
                                ) {
                                    this.messageService.add({key: 'bc', severity:'error', summary: 'ERROR!', detail: 'Usuario o Contraseña incorrecta'});
                                    this.mensaje =
                                        "usuario o contrasseña incorrecta";
                                }
                            }
                        );
                }
            }
        );
        /* if (this.listRol != null) {
            this.loginService
                .getRoot(credenciales)
                .subscribe((r: rootInterface) => {
                    this.router.navigate(["/dashboard"]).then(() => {
                        window.location.reload();
                    });
                });
        } */
    }

    openRol(usuario: string) {
        this.ref = this.dialog.open(LoginRolComponent, {
            header: "Bienvenido(a): " + usuario.toLowerCase(),
            height: "35%",
            width: this.size ? "60%" : "30%",
            style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            },
        });

        this.ref.onClose.subscribe(() => {});
    }
}

/*  Ingresar() {
        let credenciales = {
            username: this.usuario,
            password: this.password,
        };
        this.loginService.user_login(credenciales).subscribe((resp) => {
            console.log(resp);
            if (resp.error) {
                console.log("error");
            }
            if (resp.token) {
                console.log("entro");
                this.router.navigate(["dashboard"]);
            }
        });
    } */
    /* buildRol() {
        //console.log("rol", this.listRol);
        this.listRol.map((r: rolInterface) => {
            this.listAux.push({
                escala: r.escala,
            });
        });
        this.listAux.map((e: escala, index: number) => {
            let auxRol: string[] = [];
            let auxNombreRol: string[] = [];
            let listNombreRol: nombreRol[] = [];
            this.listRol.map((r: rolInterface) => {
                if (e.escala === r.escala) {
                    auxRol.push(r.rol);
                    auxNombreRol.push(r.nombreRol);
                    listNombreRol.push({
                        rol: r.rol,
                        nombreRol: r.nombreRol,
                    });
                }
            });
            this.listAux[index] = {
                user: this.usuario,
                pass: this.password,
                escala: this.listAux[index].escala,
                rol: auxRol,
                nombreRol: auxNombreRol,
                list: listNombreRol,
            };
        });
        this.loginService.listEscala = this.listAux;
        if (this.listAux !== null) this.openRol();
    } */