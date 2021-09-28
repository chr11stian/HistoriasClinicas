import {Component, OnInit} from '@angular/core';
import {UbicacionService} from "../../services/ubicacion/ubicacion.service";
import {Departamentos, Provincias, Ubicacion} from "../../../core/models/ubicacion.models";
import {PrimeNGConfig} from "primeng/api";
import Swal from "sweetalert2";

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.component.html',
    styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {


    ubicacions: Ubicacion[];
    ubicacion: Ubicacion;

    departamentos: Departamentos[];
    departamento: Departamentos;
    selected_Departamentos: any;

    provincia: Provincias
    ubicacionDialog: boolean;
    data: any;
    dataDepartamntos: any;
    dataProvincias: any
    opcion: any[];

    submitted: boolean;
    loading = true;

    constructor(private ubicacionService: UbicacionService,
    ) {
        this.getUbicacion();
    }

    ngOnInit(): void {
        this.getDepartamentos();
        this.getProvincia('21');
    }


    getUbicacion() {
        this.ubicacionService.getUbicacion().subscribe((resp: any) => {
            this.data = resp.object;
        });
    }


    getDepartamentos() {
        this.ubicacionService.getDepartamentos().subscribe((resp: any) => {
            this.dataDepartamntos = resp.object;
            // console.log(resp)
        });

    }

    getProvincia(id: string) {
        this.ubicacionService.getProvincias(id!).subscribe((resp: any) => {
            this.dataProvincias = resp.object;
            console.log(resp)
        });
    }


    editUbicacion(ubicacion: Ubicacion) {
        this.ubicacion = {...ubicacion};
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

}
