import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UbicacionService} from "../../services/ubicacion/ubicacion.service";
import {Departamentos, Filtro, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
import {PrimeNGConfig} from "primeng/api";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
        this.getUbicacion();
        this.getDepartamentos();
    }

    ngOnInit(): void {
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


    editUbicacion(ubicacion: Ubicacion) {
        this.dataUbicacion = {...ubicacion};
        this.ubicacionDialog = true;
    }


    openNew() {
        this.dataUbicacion = {};
        this.submitted = false;
        this.ubicacionDialog = true;
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
