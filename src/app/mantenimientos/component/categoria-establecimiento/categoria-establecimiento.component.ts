import {Component, OnInit} from '@angular/core';
import {CategoriaEstablecimientoService} from "../../services/categoria-establecimiento/categoria-establecimiento.service";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-categoria-establecimiento',
    templateUrl: './categoria-establecimiento.component.html',
    styleUrls: ['./categoria-establecimiento.component.css']
})
export class CategoriaEstablecimientoComponent implements OnInit {
    dataCategoriaEstablecimiento: any;
    isUpdate: boolean = false;
    idUpdate: string = "";
    form: FormGroup;

    subscription: Subscription;
    CategoriaDialog: boolean;
    submitted: boolean;

    constructor(
        private categoriaEstablecimientoService: CategoriaEstablecimientoService,
        private formBuilder: FormBuilder) {
        this.getCategoria();
        this.buildForm();
    }

    ngOnInit(): void {
    }

    getCategoria() {
        this.categoriaEstablecimientoService.getCategoriaEstablecimiento().subscribe((resp: any) => {
            this.dataCategoriaEstablecimiento = resp.object;
        });
    }

    buildForm() {
        this.form = this.formBuilder.group({
            nivel: ['', [Validators.required]],
            abreviatura: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
        })
    }

    editar(rowData) {
        this.isUpdate = true;
        this.form.get('nivel').setValue(rowData.nivel);
        this.form.get('abreviatura').setValue(rowData.abreviatura);
        this.form.get('descripcion').setValue(rowData.descripcion);
        this.idUpdate = rowData.id;
        this.CategoriaDialog = true;
    }

    openNew() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('nivel').setValue("");
        this.form.get('abreviatura').setValue("");
        this.form.get('descripcion').setValue("");
        this.CategoriaDialog = true;
    }

    saveForm() {
        this.isUpdate = false;
        const req = {
            nivel: this.form.value.nivel,
            abreviatura: this.form.value.abreviatura,
            descripcion: this.form.value.descripcion,
        }
        if (req.nivel.trim() !== "") {
            this.categoriaEstablecimientoService.createCategoriaEstablecimiento(req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado correctamente',
                        text: 'Categoria establecimiento',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.getCategoria();
                    this.CategoriaDialog = false;
                }
            )
        }
    }

    editarDatos() {
        const req = {
            id: this.idUpdate,
            nivel: this.form.value.nivel,
            abreviatura: this.form.value.abreviatura,
            descripcion: this.form.value.descripcion,
        }

        this.categoriaEstablecimientoService.editCategoriaEstablecimiento(req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado correctamente',
                    text: 'Categoria',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.getCategoria();
                this.CategoriaDialog = false;
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
                this.categoriaEstablecimientoService.deleteCategoriaEstablecimiento(rowData.id).subscribe(
                    result => {
                        this.getCategoria()
                    }
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: 'Categoria de Nivel ' + rowData.abreviatura,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }


    titulo() {
        if (this.isUpdate) return "Edite Categorias";
        else return "Ingrese Nueva Categoria";
    }

    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.CategoriaDialog = false;
        this.submitted = false;
    }


}
