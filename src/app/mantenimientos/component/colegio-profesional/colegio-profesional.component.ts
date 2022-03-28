import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ColegioProfesionalService } from '../../services/colegio-profesional/colegio-profesional.service';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
    selector: 'app-colegio-profesional',
    templateUrl: './colegio-profesional.component.html',
    styleUrls: ['./colegio-profesional.component.css'],
    providers: [DialogService]
})
export class ColegioProfesionalComponent implements OnInit {
    // Creacion del formulario
    form: FormGroup;

    data: any[] = [];
    isUpdate: boolean = false;
    idUpdate: string = "";
    colegioDialog: boolean;

    constructor(
        private colegioProfesionalservice: ColegioProfesionalService,
        public dialogService: DialogService,
        private messageService: MessageService,
        private formBuilder: FormBuilder
    ) {
        this.buildForm();
        this.getColegioProfesional();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            codigo: ['', [Validators.required]],
            nombre: ['', [Validators.required]],
            abreviatura: ['', [Validators.required]],
        })
    }

    getColegioProfesional() {
        this.colegioProfesionalservice.getColegioProfesional().subscribe((res: any) => {
            this.data = res.object;
            console.log(this.data);
        });
    }

    openNew() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('codigo').setValue("");
        this.form.get('nombre').setValue("");
        this.form.get('abreviatura').setValue("");
        this.colegioDialog = true;
    }
    saveForm() {
        console.log("guardar");
        this.isUpdate = false;
        const req = {
            codigo: this.form.value.codigo,
            nombre: this.form.value.nombre,
            abreviatura: this.form.value.abreviatura,
        }
        if (req.codigo.trim() !== "" || req.nombre.trim() !== "") {
            this.colegioProfesionalservice.createColegioProfesional(req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado correctamente',
                        text: 'Colegio Profesional',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    this.getColegioProfesional();
                    this.guardarNuevo();
                    this.colegioDialog = false;
                }
            )
        }
    }

    guardarNuevo() {
        this.isUpdate = false;
        this.form.reset();
    }

    editar(rowData) {
        this.isUpdate = true;
        this.form.get('codigo').setValue(rowData.codigo)
        this.form.get('nombre').setValue(rowData.nombre)
        this.form.get('abreviatura').setValue(rowData.abreviatura)
        this.idUpdate = rowData.id;
        this.colegioDialog = true;

    }

    editarDatos(rowData) {
        const req = {
            id: this.idUpdate,
            codigo: this.form.value.codigo,
            nombre: this.form.value.nombre,
            abreviatura: this.form.value.abreviatura,
        }
        this.colegioProfesionalservice.editColegioProfesional(req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Editado correctamente',
                    text: 'Colegio Profesional',
                    showConfirmButton: false,
                    timer: 1000
                })
                this.getColegioProfesional();
                this.guardarNuevo();
                this.colegioDialog = false;
            }
        )
    }

    eliminar(rowData) {
        this.isUpdate = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.colegioProfesionalservice.deleteColegioProfesional(rowData.id).subscribe(
                    result => {
                        this.getColegioProfesional()
                    }
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    titulo() {
        if (this.isUpdate) return "Edite Colegio Profesional";
        else return "Ingrese Nuevo Colegio Profesional";
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.colegioDialog = false;
    }
    ngOnInit(): void {
    }
}
