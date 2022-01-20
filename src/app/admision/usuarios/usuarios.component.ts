import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subscription} from "rxjs";
import {Usuario} from "../../core/models/usuarios.models";
import {UsuariosService} from "../../core/services/usuarios/usuarios.service";
import Swal from "sweetalert2";


@Component({
    selector: 'app-usuarios',
    providers: [DynamicDialogRef, DynamicDialogConfig],
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[];
    usuario: Usuario;
    selectedUsuario: Usuario[];
    usuarioDialog: boolean;
    subscription: Subscription;
    submitted: boolean;


    constructor(private usuarioService: UsuariosService,) {
        this.usuarios = [
            {
                id: 1,
                nro_doc: "46538080",
                apellidos: "Pimentel Cruz",
                nombres: "Jimmy",
                sexo: "Masculino",
                profesion: "Medicina",
                renaesIpress: "123456",
                password: "123456",
                roles: "admin",
                email: "",
                telefono: "931212919",
            },
            {
                id: 2,
                nro_doc: "242424250",
                apellidos: "Perez Mendoza",
                nombres: "Carlos",
                sexo: "Masculino",
                profesion: "Obstetricia",
                renaesIpress: "123456",
                password: "123456",
                roles: "admin",
                email: "",
                telefono: "11111111",
            }
        ]
    }

    ngOnInit(): void {

    }


    openNew() {
        // this.usuario = {};
        this.submitted = false;
        this.usuarioDialog = true;
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.usuarioDialog = false;
        this.submitted = false;
    }

    editUsuario(usuario: Usuario) {
        this.usuario = {...usuario};
        this.usuarioDialog = true;
    }

    save() {
        if (this.usuario.id == null) {
            this.usuarioService.agregarUsuarios(this.usuario)
                .subscribe(personal =>
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado',
                        text: 'Usuario',
                        showConfirmButton: false,
                        timer: 2000
                    })
                );
        } else {
            this.usuarioService.actualizarUsuarios(this.usuario)
                .subscribe(personal => Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'Usuario',
                        showConfirmButton: false,
                        timer: 2000
                    })
                );
        }
        this.usuarios = [...this.usuarios];
        this.usuarioDialog = false;
        // this.usuario = {};
    }
}
