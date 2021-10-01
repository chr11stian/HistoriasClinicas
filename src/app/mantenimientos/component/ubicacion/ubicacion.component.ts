import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UbicacionService } from "../../services/ubicacion/ubicacion.service";
import { Departamentos, Filtro, Provincias, Ubicacion } from "../../../core/models/ubicacion.models";
import { PrimeNGConfig } from "primeng/api";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
    form: FormGroup;
    @Output() eventFiltros = new EventEmitter<any>();
    dataDepartamntos: any;
    dataProvincia: any;
    dataDistrito: any;

    dataUbicacion: any;
    ubicacion: Ubicacion;
    ubicacions: Ubicacion[];
    iddd: string;



    ubicacionDialog: boolean;
    submitted: boolean;
    loading = true;

    constructor(private ubicacionService: UbicacionService,
        private formBuilder: FormBuilder,
    ) {
        this.getUbicacion();
    }

    ngOnInit(): void {
        // this.getDepartamentos();
        this.getDepartamentos();
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

    editUbicacion(ubicacion: Ubicacion) {
        this.ubicacion = { ...ubicacion };
        this.ubicacionDialog = true;
    }


    openNew() {
        this.ubicacion = {};
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
        let aux: any = this.ubicacion.departamento
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
        let aux: any = this.ubicacion.provincia;
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
