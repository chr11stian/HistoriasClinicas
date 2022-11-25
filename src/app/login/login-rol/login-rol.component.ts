import { Usuario } from "./../model/login.interface";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { LoginService } from "../services/login.service";
import { escala, nombreRol } from "../../cred/citas/models/data";
import { Router } from "@angular/router";
import { PasswordComponent } from "../password/password.component";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { PersonalService } from "src/app/core/services/personal-services/personal.service";

@Component({
    selector: "app-login-rol",
    templateUrl: "./login-rol.component.html",
    styleUrls: ["./login-rol.component.css"],
})
export class LoginRolComponent implements OnInit {
    formRol: FormGroup;
    escala: string[] = [];
    rol: string[] = [];
    nombreRol: string[] = [];
    listnombreRol: nombreRol[] = [];
    list: escala[];
    size: boolean;
    destino = [
        { name: "Emergencia", code: "Emergencia" },
        { name: "Consulta Externa", code: "Consulta Externa" },
        { name: "Apoyo al diagnóstico", code: "Apoyo al diagnóstico" },
    ];
    /* nuevo login */
    roles: string[] = [];
    data: Usuario;
    description = [
        {
            rol: "ROLE_ENF_PERSONAL",
            description: "Personal de Salud",
        },
        {
            rol: "ROLE_TEC_ADMINI_PERSONAL",
            description: "Administrador de Cupos",
        },
        {
            rol: "VISITA_DOMICILIARIA_PROFESIONAL",
            description: "Visita Domiciliaria",
        },
        {
            rol: "VISITA_DOMICILIARIA_ACTOR_SOCIAL",
            description: "Actor Social",
        },
        {
            rol: "ROLE_TEC_ADMINI_ADMIN",
            description: "Administrador del Sistema",
        },
        {
            rol: "ROLE_FARM_PERSONAL",
            description: "Farmaceutico",
        },
        {
            rol: "ROLE_LAB_PERSONAL",
            description: "Laboratorista",
        },
        {
            rol: "ROLE_ADMIN",
            description: "Administrador de Ipress",
        },
    ];
    constructor(
        private personalservice: PersonalService,
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private loginService: LoginService,
        private router: Router,
        private dialog: DialogService,
        private breakpointObserver: BreakpointObserver
    ) {}

    size_width() {
        this.breakpointObserver
            .observe(["(max-width: 500px)"])
            .subscribe((result: BreakpointState) => {
                this.size = result.matches;
            });
    }

    ngOnInit(): void {
        this.size_width();
        /* nuevo login */
        this.formBuild();
        this.cargarRoles();//this.roles = this.loginService.roles;
        this.data = <Usuario>JSON.parse(localStorage.getItem("usuario"));
    }
    cargarRoles() {
        this.loginService.roles.map((obj) => {
            let aux = this.description.find((r) => r.rol == obj);
            this.roles.push(aux.description);
        });
    }
    findRol(descripction: string) {
        let aux = this.description.find((r) => r.description == descripction);
        return aux.rol;
    }

    buildEscala() {
        this.list.map((r: escala) => {
            this.escala.push(r.escala);
        });
        this.rol = this.list[0].rol;
        this.nombreRol = this.list[0].nombreRol;
        this.listnombreRol = this.list[0].list;
    }

    searchEscala(s: string) {
        this.list.map((r: escala) => {
            if (s === r.escala) {
                this.rol = r.rol;
                this.nombreRol = r.nombreRol;
            }
        });
    }

    cambio(e) {
        //this.searchEscala(e.value);
    }

    formBuild() {
        this.formRol = this.formBuilder.group({
            // escala: new FormControl("", []),
            rol: new FormControl(""),
        });
    }

    openPassword() {
        this.ref = this.dialog.open(PasswordComponent, {
            header: "Cambiar la contraseña",
            height: "45%",
            width: this.size ? "60%" : "25%",
            style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            },
        });

        this.ref.onClose.subscribe(() => {});
    }
    /* nuevo login*/
    ingresarLogin() {
        let rol =
            this.formRol.value.rol === ""
                ? this.roles[0]
                : this.formRol.value.rol;
        localStorage.setItem("rol", JSON.stringify(this.findRol(rol)));
        //console.log("data", this.data);
        this.personalservice.listServiceStaff(this.data.nroDocumento).subscribe(
            (res: any) => {
                console.log("res", res);
                if (res.object != null && this.findRol(rol) === "ROLE_ENF_PERSONAL") {
                    res.object[0].roles.map((aux) => {
                        if (aux.nombreUPS == "ATENCION INTEGRAL DEL NINO") {
                            //aux.nombreFuncion == "SERVICIOS ADMINISTRACION" &&
                            this.router
                                .navigate(["/dashboard/cred/citas"])
                                .then(() => {
                                    window.location.reload();
                                });
                        } else if (aux.nombreUPS == "OBSTETRICIA") {
                            //aux.nombreFuncion == "SERVICIOS ADMINISTRACION" &&
                            this.router
                                .navigate([
                                    "/dashboard/obstetricia-general/citas",
                                ])
                                .then(() => {
                                    window.location.reload();
                                });
                                
                        }else if (aux.nombreUPS == "MEDICINA GENERAL") {
                            //aux.nombreFuncion == "SERVICIOS ADMINISTRACION" &&
                            this.router
                                .navigate([
                                    "dashboard/consulta-generica/lista-cita/MEDICINA GENERAL",
                                ])
                                .then(() => {
                                    window.location.reload();
                                });
                                
                        }
                        else if (aux.nombreUPS == "ODONTOLOGIA GENERAL") {
                            //aux.nombreFuncion == "SERVICIOS ADMINISTRACION" &&
                            this.router
                                .navigate([
                                    "dashboard/consulta-generica/lista-cita/ODONTOLOGIA GENERAL",
                                ])
                                .then(() => {
                                    window.location.reload();
                                });
                                
                        }
                        else if (aux.nombreUPS == "PSICOLOGIA") {
                            //aux.nombreFuncion == "SERVICIOS ADMINISTRACION" &&
                            this.router
                                .navigate([
                                    "dashboard/consulta-generica/lista-cita/PSICOLOGIA",
                                ])
                                .then(() => {
                                    window.location.reload();
                                });
                                
                        }
                        else if (aux.nombreUPS == "NUTRICION") {
                            //aux.nombreFuncion == "SERVICIOS ADMINISTRACION" &&
                            this.router
                                .navigate([
                                    "dashboard/consulta-generica/lista-cita/NUTRICION",
                                ])
                                .then(() => {
                                    window.location.reload();
                                });
                                
                        }
                        
                    });
                } else {
                    this.router.navigate(["/dashboard"]).then(() => {
                        window.location.reload();
                    });
                }
            },
            (error) => {
                if (error.status == 500 && rol) {
                    this.router.navigate(["/dashboard"]).then(() => {
                        window.location.reload();
                    });
                }
            }
        );
        this.ref.close();
    }
}
  /* ingresar() {
        let rol =
            this.formRol.value.rol === ""
                ? this.rol[0]
                : this.formRol.value.rol;
        let escala =
            this.formRol.value.escala === ""
                ? this.escala[0]
                : this.formRol.value.escala;
        let credenciales = {
            username: this.serviceLogin.listEscala[0].user,
            password: this.serviceLogin.listEscala[0].pass,
            rol: rol,
            escala: escala,
        };
        this.serviceLogin.ingresar(credenciales).subscribe((resp) => {
            if (resp.error) {
                console.log("error");
            }
            if (resp.token) {
                this.serviceLogin.getRol().subscribe((r: any) => {
                    localStorage.setItem(
                        "roles",
                        JSON.stringify({ rol: rol, escala: escala })
                    );
                });
                if (
                    this.serviceLogin.listEscala[0].user ===
                    this.serviceLogin.listEscala[0].pass
                )
                    this.openPassword();
                else {
                    // lista de servicio por personal 
                    this.serviceLogin
                        .listServiceStaff(credenciales.username)
                        .subscribe((r: any) => {
                            if (r.object != null && rol != "ROL_4_7") {
                                r.object[0].roles.map((aux) => {
                                    if (
                                        aux.nombreFuncion ==
                                            "SERVICIOS ADMINISTRACION" &&
                                        aux.nombreUPS ==
                                            "ATENCION INTEGRAL DEL NINO"
                                    ) {
                                        this.router
                                            .navigate(["/dashboard/cred/citas"])
                                            .then(() => {
                                                window.location.reload();
                                            });
                                    } else if (
                                        aux.nombreFuncion ==
                                            "SERVICIOS ADMINISTRACION" &&
                                        aux.nombreUPS == "OBSTETRICIA"
                                    ) {
                                        this.router
                                            .navigate([
                                                "/dashboard/obstetricia-general/citas",
                                            ])
                                            .then(() => {
                                                window.location.reload();
                                            });
                                    }
                                });
                            } else {
                                this.router
                                    .navigate(["/dashboard"])
                                    .then(() => {
                                        window.location.reload();
                                    });
                            }
                        });
                }
                //this.router.navigate(['dashboard']);
            }
        });
        this.ref.close();
    } */
