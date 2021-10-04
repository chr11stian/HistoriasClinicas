import {Component, OnInit} from '@angular/core';
import {NombreComercialUPSService} from "../../services/nombre-comercial-UPS/nombre-comercial-ups.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
    selector: 'app-nombre-comercial-ups',
    templateUrl: './nombre-comercial-ups.component.html',
    styleUrls: ['./nombre-comercial-ups.component.css']
})
export class NombreComercialUPSComponent implements OnInit {
    datanombreComercialUPS: any;
    isUpdate: boolean = false;
    idUpdate: string = "";
    form: FormGroup;

    nombreComercialUPSDialog: boolean;
    submitted: boolean;

    constructor(
        private nombreComercialUPSService: NombreComercialUPSService,
        private formBuilder: FormBuilder
    ) {
        this.get_nombreComercialUPS();
        this.buildForm();
    }

    ngOnInit(): void {

    }

    get_nombreComercialUPS() {
        this.nombreComercialUPSService.getNombreComercial_UPS().subscribe((resp: any) => {
            this.datanombreComercialUPS = resp.object;
        });
    }

    buildForm() {
        this.form = this.formBuilder.group({
            nombre: ['', [Validators.required]],
            abreviatura: ['', [Validators.required]],
            tipoServicio: ['', [Validators.required]],
            iconPath: ['', [Validators.required]],
        })
    }

    edit(rowData) {
        this.isUpdate = true;
        this.form.get('nombre').setValue(rowData.nombre);
        this.form.get('abreviatura').setValue(rowData.abreviatura);
        this.form.get('tipoServicio').setValue(rowData.tipoServicio);
        this.form.get('iconPath').setValue(rowData.iconPath);
        this.idUpdate = rowData.id;
        this.nombreComercialUPSDialog = true;
    }

    openNew() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('nombre').setValue("");
        this.form.get('abreviatura').setValue("");
        this.form.get('tipoServicio').setValue("");
        this.form.get('iconPath').setValue("");
        this.nombreComercialUPSDialog = true;
    }


    saveForm() {
        this.isUpdate = false;
        const req = {
            nombre: this.form.value.nombre,
            abreviatura: this.form.value.abreviatura,
            tipoServicio: this.form.value.tipoServicio,
            iconPath: this.form.value.iconPath,
        }
        if (req.nombre.trim() !== "") {
            this.nombreComercialUPSService.createNombreComercial_UPS(req).subscribe(
                result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado correctamente',
                        text: 'Nombre comercial UPS',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    this.get_nombreComercialUPS();
                    this.nombreComercialUPSDialog = false;
                }
            )
        }
    }

    editarDatos(id) {
        const req = {
            id: this.idUpdate,
            nombre: this.form.value.nombre,
            abreviatura: this.form.value.abreviatura,
            tipoServicio: this.form.value.tipoServicio,
            iconPath: this.form.value.iconPath,
        }

        id = req.id;

        this.nombreComercialUPSService.editNombreComercial_UPS(id, req).subscribe(
            result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado correctamente',
                    text: 'Nombre Comercial UPS',
                    showConfirmButton: false,
                    timer: 1500,
                })
                this.get_nombreComercialUPS();
                this.nombreComercialUPSDialog = false;
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
                this.nombreComercialUPSService.deleteNombreComercial_UPS(rowData.id).subscribe(
                    result => {
                        this.get_nombreComercialUPS()
                    }
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: 'Nombre comercial UPS ' + rowData.nombre,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    titulo() {
        if (this.isUpdate) return "Edite Nombre Comercial UPS";
        else return "INGRESE UN NUEVO NOMBRE COMERCIAL UPS";
    }


    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado',
            text: 'Cancelando...',
            showConfirmButton: false,
            timer: 1000
        })
        this.nombreComercialUPSDialog = false;
        this.submitted = false;
    }

}
