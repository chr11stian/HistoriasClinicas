import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UbicacionService} from "../../services/ubicacion/ubicacion.service";
import {Departamentos, Filtro, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
import Swal from "sweetalert2";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
    dataUbicacion: any;
    isUpdate: boolean = false;
    idUpdate: string = "";
    form: FormGroup;

    ubicacionDialog: boolean;

    dataDepartamntos: any;
    dataProvincia: any;
    dataDistrito: any;

    submitted: boolean;


    iddd: string;


    constructor(private ubicacionService: UbicacionService,
                private formBuilder: FormBuilder,
    ) {
        this.buildForm();
        this.getUbicacion();
        this.getDepartamentos();
    }

    ngOnInit(): void {

    }

    getFU(control: string): AbstractControl {
        return this.form.get(control)
    }


    isInvalid(control: string): boolean {
        const formUbicacion: AbstractControl = this.form.get(control)
        return (formUbicacion.invalid && (formUbicacion.dirty || formUbicacion.touched))
    }


    getUbicacion() {
        this.ubicacionService.getUbicacion().subscribe((resp: any) => {
            this.dataUbicacion = resp.object;
        });
    }


    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamntos = resp.object;
            console.log('dep ', this.dataDepartamntos)
        });
    }

    buildForm() {
        this.form = this.formBuilder.group({
            ubigeo: ['', [Validators.required]],
            departamento: ['', [Validators.required]],
            provincia: ['', [Validators.required]],
            distrito: ['', [Validators.required]],
            ccpp: ['', [Validators.required]],
            latitude: ['', [Validators.required]],
            longitude: ['', [Validators.required]],
            poblacion: ['', [Validators.required]],
            altura: ['', [Validators.required]],
            es_Capital: ['', [Validators.required]],
        })
    }

    edit(rowData) {
        this.isUpdate = true;
        this.form.get('ubigeo').setValue(rowData.ubigeo);
        this.form.get('departamento').setValue(rowData.departamento);
        this.form.get('provincia').setValue(rowData.provincia);
        this.form.get('distrito').setValue(rowData.distrito);
        this.form.get('ccpp').setValue(rowData.ccpp);
        this.form.get('latitude').setValue(rowData.latitude);
        this.form.get('longitude').setValue(rowData.longitude);
        this.form.get('poblacion').setValue(rowData.poblacion);
        this.form.get('altura').setValue(rowData.altura);
        this.form.get('es_Capital').setValue(rowData.es_Capital);
        this.idUpdate = rowData.id;
        this.ubicacionDialog = true;
    }

    openNew() {
        this.isUpdate = false;
        this.form.reset();
        this.form.get('ubigeo').setValue("");
        this.form.get('departamento').setValue("");
        this.form.get('provincia').setValue("");
        this.form.get('distrito').setValue("");
        this.form.get('ccpp').setValue("");
        this.form.get('latitude').setValue("");
        this.form.get('longitude').setValue("");
        this.form.get('poblacion').setValue("");
        this.form.get('altura').setValue("");
        this.form.get('es_Capital').setValue("");
        this.ubicacionDialog = true;
    }


    editUbicacion(ubicacion: Ubicacion) {
        this.dataUbicacion = {...ubicacion};
        this.ubicacionDialog = true;
    }

    limpiar() {
        this.form.reset();
    }


    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.ubicacionDialog = false;
        this.submitted = false;
    }

    selectedDepartamento() {
        let aux: any = this.dataUbicacion.departamento
        let dpto = {
            iddd: aux.iddd
        }
        this.iddd = aux.iddd
        this.ubicacionService.getProvincias(dpto).subscribe((res: any) => {
            this.dataProvincia = res.object;
            console.log('data pro', this.dataProvincia)
        })
    }

    selectedProvincia() {
        let aux: any = this.dataUbicacion.provincia;
        let provincia = {
            iddd: this.iddd,
            idpp: aux.idpp
        };
        this.ubicacionService.getDistritos(provincia).subscribe((res: any) => {
            this.dataDistrito = res.object;

            console.log('distrito ', this.dataDistrito)
        })
    }
}
